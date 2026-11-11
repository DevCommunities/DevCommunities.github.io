import {
  defaultHubContent,
  validateHubContent,
  type HubContent,
} from "../src/lib/hub-content.ts";

export const contentKey = "site/link-hub.json";
export type ContentState = {
  draft: HubContent;
  published: HubContent;
  updatedAt: string | null;
  publishedAt: string | null;
  updatedBy: string | null;
};

export async function readState(
  bucket: R2Bucket,
): Promise<{ state: ContentState; etag: string }> {
  const object = await bucket.get(contentKey);
  if (!object)
    return {
      state: {
        draft: structuredClone(defaultHubContent),
        published: structuredClone(defaultHubContent),
        updatedAt: null,
        publishedAt: null,
        updatedBy: null,
      },
      etag: "new",
    };
  const stored = await object.json<ContentState>();
  // Stored content crosses the same validation boundary as incoming edits.
  return {
    state: {
      ...stored,
      draft: validateHubContent(stored.draft),
      published: validateHubContent(stored.published),
    },
    etag: object.etag,
  };
}

export async function saveState(
  bucket: R2Bucket,
  state: ContentState,
  etag: string,
) {
  return bucket.put(contentKey, JSON.stringify(state), {
    onlyIf: etag === "new" ? { etagDoesNotMatch: "*" } : { etagMatches: etag },
    httpMetadata: { contentType: "application/json", cacheControl: "no-store" },
  });
}

export async function readBody(
  request: Request,
  limit: number,
): Promise<Uint8Array> {
  if (Number(request.headers.get("content-length")) > limit)
    throw new Error("BODY_TOO_LARGE");
  if (!request.body) return new Uint8Array();
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > limit) {
      await reader.cancel();
      throw new Error("BODY_TOO_LARGE");
    }
    chunks.push(value);
  }
  const body = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.length;
  }
  return body;
}

export function imageType(
  bytes: Uint8Array,
): { type: string; extension: string } | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff)
    return { type: "image/jpeg", extension: "jpg" };
  if (
    [137, 80, 78, 71, 13, 10, 26, 10].every(
      (value, index) => bytes[index] === value,
    )
  )
    return { type: "image/png", extension: "png" };
  const decoder = new TextDecoder();
  if (
    decoder.decode(bytes.slice(0, 4)) === "RIFF" &&
    decoder.decode(bytes.slice(8, 12)) === "WEBP"
  )
    return { type: "image/webp", extension: "webp" };
  return null;
}

export function referencedMedia(content: HubContent): Set<string> {
  return new Set([
    content.settings.banner,
    ...content.camps.flatMap((event) => [event.poster, event.thumbnail]),
    ...content.competitions.flatMap((event) => [event.poster, event.thumbnail]),
  ]);
}
