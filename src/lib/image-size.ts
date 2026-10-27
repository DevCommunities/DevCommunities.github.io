import sizes from "../data/image-sizes.json";

/** Intrinsic dimensions reserve space before local images load. */
export function imageSize(src: string) {
  return (sizes as Record<string, { width: number; height: number }>)[src] || {};
}
