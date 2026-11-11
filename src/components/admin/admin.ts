import {
  validateHubContent,
  type HubContent,
  type EditableEvent,
} from "../../lib/hub-content";
import { escapeHtml } from "../../lib/hub-render";

type Collection = "camps" | "competitions";
type EditorState = {
  draft: HubContent;
  etag: string;
  publishedAt: string | null;
  updatedAt: string | null;
  email: string;
};
const editor = document.querySelector<HTMLFormElement>("#admin-editor")!;
const status = document.querySelector<HTMLElement>("#admin-status")!;
const error = document.querySelector<HTMLElement>("#admin-error")!;
let content: HubContent;
let revision = "";
let dirty = false;
let busy = false;
let activePanel = "camps";

const settingsFields = [
  ["heading", "หัวข้อหลัก"],
  ["description", "คำอธิบายใต้หัวข้อ"],
  ["bannerAlt", "คำอธิบายภาพแบนเนอร์"],
  ["lineUrl", "ลิงก์ LINE"],
  ["campsHeading", "หัวข้อหมวดค่าย"],
  ["campsDescription", "คำอธิบายหมวดค่าย"],
  ["campsMonth", "เดือนหรือชื่อกลุ่มค่าย"],
  ["competitionsHeading", "หัวข้อหมวดงานแข่ง"],
  ["competitionsDescription", "คำอธิบายหมวดงานแข่ง"],
  ["competitionsMonth", "เดือนหรือชื่อกลุ่มงานแข่ง"],
  ["competitionNote", "หมายเหตุงานแข่ง"],
] as const;
const eventFields = [
  ["title", "ชื่อรายการ", "text"],
  ["description", "รายละเอียดและกลุ่มเป้าหมาย", "text"],
  ["schedule", "วันและเวลาเรียนหรือแข่งขัน", "text"],
  ["deadline", "วันปิดรับสมัคร", "date"],
  ["price", "ราคา เช่น 1,190 บาท หรือ สมัครฟรี", "text"],
  ["signupUrl", "ลิงก์สมัคร (HTTPS)", "url"],
] as const;

function field(
  name: string,
  label: string,
  value: string,
  type = "text",
  required = true,
): string {
  return `<label>${escapeHtml(label)}<input name="${escapeHtml(name)}" type="${type}" value="${escapeHtml(value)}" ${required ? "required" : ""} maxlength="1000"></label>`;
}

function showError(message: string) {
  error.textContent = message;
  error.hidden = false;
}
function setBusy(value: boolean) {
  busy = value;
  editor
    .querySelectorAll<HTMLInputElement | HTMLButtonElement>("input,button")
    .forEach((control) => {
      control.disabled = value || control.hasAttribute("data-boundary");
    });
  document.querySelector<HTMLButtonElement>("#admin-reload")!.disabled = value;
}
function changed() {
  dirty = true;
  status.textContent = "มีการแก้ไขที่ยังไม่บันทึก";
}

function selectPanel(name: string) {
  activePanel = name;
  editor.querySelectorAll<HTMLElement>("[data-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.panel !== name;
  });
  editor.querySelectorAll<HTMLButtonElement>("[data-tab]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.tab === name));
  });
}

function render() {
  for (const collection of ["camps", "competitions"] as const) {
    const container = editor.querySelector<HTMLElement>(
      `[data-events="${collection}"]`,
    )!;
    const openIds = new Set(
      [...container.querySelectorAll<HTMLDetailsElement>("details[open]")].map(
        (element) => element.dataset.id,
      ),
    );
    container.innerHTML =
      content[collection]
        .map(
          (
            event,
            index,
          ) => `<details class="admin-event" data-id="${escapeHtml(event.id)}" data-collection="${collection}" ${openIds.has(event.id) || !event.title ? "open" : ""}>
      <summary><img src="${escapeHtml(event.thumbnail)}" alt="" width="42" height="52"><span><strong>${escapeHtml(event.title || "รายการใหม่")}</strong><small>${event.visible ? "แสดงบนเว็บไซต์" : "ซ่อนจากเว็บไซต์"} · ปิดรับ ${escapeHtml(event.deadline || "ยังไม่กำหนด")}</small></span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></summary>
      <div class="admin-event-body"><div class="admin-grid">${eventFields.map(([key, label, type]) => field(`${collection}.${event.id}.${key}`, label, event[key] || "", type, !["schedule", "signupUrl"].includes(key))).join("")}</div>
      <div class="admin-event-media"><img src="${escapeHtml(event.poster)}" alt="โปสเตอร์ปัจจุบัน" loading="lazy"><div><label class="admin-upload">เปลี่ยนโปสเตอร์<input type="file" data-upload="${event.id}" data-collection="${collection}" accept="image/jpeg,image/png,image/webp"></label><p class="admin-help">รองรับ JPEG, PNG และ WebP ระบบสร้างภาพย่อให้อัตโนมัติ</p></div></div>
      <label class="admin-checkbox"><input name="${collection}.${event.id}.visible" type="checkbox" ${event.visible ? "checked" : ""}>แสดงรายการนี้บนเว็บไซต์</label>
      <div class="admin-event-actions"><button type="button" data-move="-1" data-id="${event.id}" data-collection="${collection}" ${index === 0 ? "disabled data-boundary" : ""}>เลื่อนขึ้น</button><button type="button" data-move="1" data-id="${event.id}" data-collection="${collection}" ${index === content[collection].length - 1 ? "disabled data-boundary" : ""}>เลื่อนลง</button><button type="button" class="admin-danger" data-remove="${event.id}" data-collection="${collection}">นำรายการออก</button></div></div></details>`,
        )
        .join("") ||
      '<p class="admin-empty">ยังไม่มีรายการ กดปุ่มเพิ่มเพื่อสร้างรายการแรก</p>';
  }
  const settings = document.querySelector<HTMLElement>("#admin-settings")!;
  settings.innerHTML = `<div class="admin-card admin-grid">${settingsFields.map(([key, label]) => field(`settings.${key}`, label, String(content.settings[key]), key === "lineUrl" ? "url" : "text", key !== "competitionNote")).join("")}</div><div class="admin-card admin-grid"><h3>ช่องทางโซเชียล</h3>${Object.entries(
    content.settings.socials,
  )
    .map(([key, value]) => field(`socials.${key}`, key, value, "url"))
    .join("")}</div>`;
  document.querySelector<HTMLImageElement>("#admin-banner-preview")!.src =
    content.settings.banner;
  document.querySelector<HTMLElement>("#admin-prices")!.innerHTML = (
    ["solo", "group"] as const
  )
    .map(
      (type) =>
        `<div class="admin-card"><h3>${type === "solo" ? "ติวเดี่ยว (บาท)" : "ติวกลุ่ม (บาทต่อคน)"}</h3><div class="admin-grid">${(["online", "onsite"] as const).map((mode) => `<fieldset><legend>${mode === "online" ? "ออนไลน์" : "ออนไซต์ รวมค่าเดินทาง"}</legend>${["รายชั่วโมง", "รายเดือน สัปดาห์ละ 1 ครั้ง", "รายเดือน สัปดาห์ละ 2 ครั้ง"].map((label, index) => field(`prices.${type}.${mode}.${index}`, label, String(content.prices[type][mode][index]), "number")).join("")}</fieldset>`).join("")}</div><p class="admin-help">แพ็กเกจรายเดือนเรียนครั้งละ 2 ชั่วโมง</p></div>`,
    )
    .join("");
  selectPanel(activePanel);
}

function readEditor(): HubContent {
  const next = structuredClone(content);
  const form = new FormData(editor);
  for (const [key] of settingsFields)
    next.settings[key] = String(form.get(`settings.${key}`) ?? "");
  for (const key of ["facebook", "instagram", "tiktok", "youtube"] as const)
    next.settings.socials[key] = String(form.get(`socials.${key}`) ?? "");
  for (const collection of ["camps", "competitions"] as const) {
    for (const event of next[collection]) {
      for (const [key] of eventFields)
        event[key] = String(form.get(`${collection}.${event.id}.${key}`) ?? "");
      event.visible = form.has(`${collection}.${event.id}.visible`);
    }
  }
  for (const type of ["solo", "group"] as const) {
    for (const mode of ["online", "onsite"] as const)
      next.prices[type][mode] = [0, 1, 2].map((index) =>
        Number(form.get(`prices.${type}.${mode}.${index}`)),
      );
  }
  return next;
}

async function request(path: string, options: RequestInit = {}) {
  const response = await fetch(path, {
    ...options,
    credentials: "same-origin",
    redirect: "error",
  });
  if (!response.headers.get("content-type")?.includes("application/json"))
    throw new Error("กรุณาเข้าสู่ระบบใหม่ แล้วกลับมาที่หน้า /admin");
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "คำขอไม่สำเร็จ กรุณาลองใหม่");
  return data;
}

function acceptState(state: EditorState) {
  content = state.draft;
  revision = state.etag;
  dirty = false;
  document.querySelector<HTMLElement>("#admin-identity")!.textContent =
    state.email;
  document.querySelector<HTMLElement>("#admin-revision")!.textContent =
    state.publishedAt
      ? `เผยแพร่ล่าสุด ${new Date(state.publishedAt).toLocaleString("th-TH", { timeZone: "Asia/Bangkok" })}`
      : "ยังไม่มีการเผยแพร่จากหน้าแอดมิน";
}

async function load() {
  if (dirty && !confirm("โหลดข้อมูลล่าสุดและทิ้งการแก้ไขที่ยังไม่บันทึก?"))
    return;
  error.hidden = true;
  setBusy(true);
  try {
    acceptState(await request("/api/admin/content"));
    render();
    editor.hidden = false;
    status.textContent = "พร้อมแก้ไข ข้อมูลที่เผยแพร่จะปรากฏบนเว็บไซต์ทันที";
  } catch (cause) {
    showError(cause instanceof Error ? cause.message : "โหลดข้อมูลไม่สำเร็จ");
    status.textContent = "โหลดเนื้อหาไม่สำเร็จ";
  } finally {
    setBusy(false);
  }
}

editor.addEventListener("input", changed);
editor.addEventListener(
  "invalid",
  (event) => {
    const target = event.target as HTMLElement;
    const panel = target.closest<HTMLElement>("[data-panel]");
    if (panel?.dataset.panel) selectPanel(panel.dataset.panel);
    const details = target.closest("details");
    if (details) details.open = true;
  },
  true,
);

editor.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (busy) return;
  error.hidden = true;
  try {
    const next = validateHubContent(readEditor());
    const action = (event.submitter as HTMLButtonElement).dataset.action!;
    setBusy(true);
    status.textContent =
      action === "publish" ? "กำลังเผยแพร่…" : "กำลังบันทึกฉบับร่าง…";
    const result = await request("/api/admin/content", {
      method: "PUT",
      headers: { "Content-Type": "application/json", "If-Match": revision },
      body: JSON.stringify({ action, content: next }),
    });
    acceptState(result);
    render();
    status.textContent =
      action === "publish"
        ? "เผยแพร่แล้ว ผู้เข้าชมเห็นข้อมูลใหม่ได้ทันที"
        : "บันทึกฉบับร่างแล้ว กดดูฉบับร่างเพื่อตรวจสอบ";
  } catch (cause) {
    showError(cause instanceof Error ? cause.message : "บันทึกไม่สำเร็จ");
    status.textContent = "การแก้ไขยังอยู่ในหน้านี้ กรุณาตรวจสอบก่อนลองใหม่";
  } finally {
    setBusy(false);
  }
});

editor.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
    "button",
  );
  if (!button || busy) return;
  if (button.dataset.tab) {
    selectPanel(button.dataset.tab);
    return;
  }
  if (button.dataset.add) {
    content = readEditor();
    const collection = button.dataset.add as Collection;
    if (content[collection].length >= 100) {
      showError("เพิ่มได้ไม่เกิน 100 รายการต่อหมวด");
      return;
    }
    content[collection].push({
      id: `event-${crypto.randomUUID()}`,
      title: "",
      description: "",
      schedule: "",
      deadline: "",
      price: "",
      signupUrl: "",
      poster: content.settings.banner,
      thumbnail: content.settings.banner,
      width: content.settings.bannerWidth,
      height: content.settings.bannerHeight,
      visible: true,
    });
    render();
    changed();
    return;
  }
  if (button.dataset.remove || button.dataset.move) {
    content = readEditor();
    const collection = button.dataset.collection as Collection;
    const index = content[collection].findIndex(
      (item) => item.id === (button.dataset.remove || button.dataset.id),
    );
    if (index < 0) return;
    if (button.dataset.remove) {
      if (
        !confirm("นำรายการนี้ออกจากฉบับร่าง? เว็บไซต์จะเปลี่ยนหลังจากกดเผยแพร่")
      )
        return;
      content[collection].splice(index, 1);
    } else {
      const next = index + Number(button.dataset.move);
      if (next < 0 || next >= content[collection].length) return;
      [content[collection][index], content[collection][next]] = [
        content[collection][next],
        content[collection][index],
      ];
    }
    render();
    changed();
  }
});

async function prepareImage(file: File, maxSide: number) {
  const image = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  canvas.getContext("2d")!.drawImage(image, 0, 0, canvas.width, canvas.height);
  image.close();
  const blob = await new Promise<Blob>((resolve, reject) =>
    canvas.toBlob(
      (value) =>
        value ? resolve(value) : reject(new Error("เตรียมรูปภาพไม่สำเร็จ")),
      "image/webp",
      0.86,
    ),
  );
  return { blob, width: canvas.width, height: canvas.height };
}

editor.addEventListener("change", async (event) => {
  const input = event.target as HTMLInputElement;
  if (input.type !== "file" || !input.files?.[0] || busy) return;
  const file = input.files[0];
  if (
    file.size > 20 * 1024 * 1024 ||
    !["image/jpeg", "image/png", "image/webp"].includes(file.type)
  ) {
    showError("เลือกรูป JPEG, PNG หรือ WebP ขนาดไม่เกิน 20 MB");
    return;
  }
  content = readEditor();
  error.hidden = true;
  setBusy(true);
  status.textContent = "กำลังเตรียมและอัปโหลดรูป…";
  try {
    const full = await prepareImage(file, 1600);
    const uploaded = await request("/api/admin/media", {
      method: "POST",
      headers: { "Content-Type": full.blob.type },
      body: full.blob,
    });
    if (input.hasAttribute("data-upload-banner")) {
      content.settings.banner = uploaded.url;
      content.settings.bannerWidth = full.width;
      content.settings.bannerHeight = full.height;
    } else {
      const thumbnail = await prepareImage(file, 240);
      const thumb = await request("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": thumbnail.blob.type },
        body: thumbnail.blob,
      });
      const item = content[input.dataset.collection as Collection].find(
        (value) => value.id === input.dataset.upload,
      )!;
      Object.assign(item, {
        poster: uploaded.url,
        thumbnail: thumb.url,
        width: full.width,
        height: full.height,
      });
    }
    render();
    changed();
    status.textContent =
      "อัปโหลดรูปแล้ว กดบันทึกฉบับร่างหรือเผยแพร่เพื่อใช้รูปใหม่";
  } catch (cause) {
    showError(cause instanceof Error ? cause.message : "อัปโหลดรูปไม่สำเร็จ");
    status.textContent = "รูปเดิมยังอยู่ กรุณาลองใหม่";
  } finally {
    input.value = "";
    setBusy(false);
  }
});

document.querySelector("#admin-reload")!.addEventListener("click", load);
document.querySelector("#admin-preview")!.addEventListener("click", (event) => {
  if (dirty || busy) {
    event.preventDefault();
    showError("บันทึกฉบับร่างก่อนเปิดตัวอย่าง เพื่อให้เห็นการแก้ไขล่าสุด");
  }
});
window.addEventListener("beforeunload", (event) => {
  if (dirty || busy) {
    event.preventDefault();
    event.returnValue = "";
  }
});
load();
