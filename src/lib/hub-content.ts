import {
  competitions,
  featuredCamps,
  lineUrl,
  type HubEvent,
} from "../data/link-hub.ts";
import { tutoringPrices } from "./pricing.ts";
import imageSizes from "../data/image-sizes.json";

export type EditableEvent = HubEvent & {
  poster: string;
  thumbnail: string;
  width: number;
  height: number;
  visible: boolean;
};

export type HubContent = {
  settings: {
    heading: string;
    description: string;
    banner: string;
    bannerAlt: string;
    bannerWidth: number;
    bannerHeight: number;
    lineUrl: string;
    campsHeading: string;
    campsDescription: string;
    campsMonth: string;
    competitionsHeading: string;
    competitionsDescription: string;
    competitionsMonth: string;
    competitionNote: string;
    socials: Record<"facebook" | "instagram" | "tiktok" | "youtube", string>;
  };
  camps: EditableEvent[];
  competitions: EditableEvent[];
  prices: typeof tutoringPrices;
};

function editableEvent(event: HubEvent): EditableEvent {
  const poster = `/images/link-hub/${event.id}.webp`;
  const dimensions = imageSizes[poster as keyof typeof imageSizes] || {
    width: 1080,
    height: 1350,
  };
  return {
    ...event,
    poster,
    thumbnail: `/images/link-hub/${event.id}-thumb.webp`,
    width: dimensions.width || 1080,
    height: dimensions.height || 1350,
    visible: true,
  };
}

export const defaultHubContent: HubContent = {
  settings: {
    heading: "เริ่มต้นสิ่งใหม่ไปด้วยกัน",
    description: "ค่ายที่อยากลอง เรื่องที่อยากเรียน และสนามให้ลองฝีมือ",
    banner: "/images/link-hub/workshop-banner-1280.webp",
    bannerAlt:
      "DevCommu Tech Training Workshop เรียนรู้แบบลงมือทำ สำหรับโรงเรียน มหาวิทยาลัย และองค์กร",
    bannerWidth: 1280,
    bannerHeight: 534,
    lineUrl,
    campsHeading: "ค่ายที่กำลังจะมาถึง",
    campsDescription: "เลือกค่าย ดูโปสเตอร์ แล้วสมัครได้เลย",
    campsMonth: "พฤศจิกายน 2569",
    competitionsHeading: "เก็บไอเดียจากสนามแข่ง",
    competitionsDescription: "รวมรายละเอียดและโปสเตอร์สำหรับดูย้อนหลัง",
    competitionsMonth: "ตุลาคม 2569",
    competitionNote:
      "รายการเดือนตุลาคมปิดรับสมัครแล้ว วันปิดรับและรายละเอียดอ้างอิงจากโปสเตอร์ของแต่ละงาน",
    socials: {
      facebook: "https://www.facebook.com/DevCommu",
      instagram: "https://www.instagram.com/DevCommu",
      tiktok: "https://www.tiktok.com/@devcommu",
      youtube: "https://www.youtube.com/@DevCommu",
    },
  },
  camps: featuredCamps.map(editableEvent),
  competitions: competitions.map(editableEvent),
  prices: tutoringPrices,
};

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} ต้องเป็นข้อมูลแบบฟอร์ม`);
  return value as Record<string, unknown>;
}

function text(
  value: unknown,
  label: string,
  max = 1000,
  optional = false,
): string {
  if (
    typeof value !== "string" ||
    value.length > max ||
    (!optional && !value.trim())
  )
    throw new Error(`ตรวจสอบ ${label} (ไม่เกิน ${max} ตัวอักษร)`);
  return value.trim();
}

function number(value: unknown, label: string, max = 10000000): number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < 0 ||
    value > max
  )
    throw new Error(`ตรวจสอบตัวเลข ${label}`);
  return value;
}

function imagePath(value: unknown, label: string): string {
  const path = text(value, label, 300);
  if (!/^\/(images|media)\/[a-zA-Z0-9._/-]+$/.test(path) || path.includes(".."))
    throw new Error(`${label} ต้องเป็นรูปที่อัปโหลดหรือรูปในเว็บไซต์`);
  return path;
}

function httpsUrl(value: unknown, label: string, optional = false): string {
  const result = text(value, label, 1000, optional);
  if (!result && optional) return "";
  let url: URL;
  try {
    url = new URL(result);
  } catch {
    throw new Error(`${label} ต้องเป็นลิงก์ HTTPS`);
  }
  if (url.protocol !== "https:" || url.username || url.password)
    throw new Error(`${label} ต้องเป็นลิงก์ HTTPS`);
  return url.href;
}

function events(value: unknown, label: string): EditableEvent[] {
  if (!Array.isArray(value) || value.length > 100)
    throw new Error(`${label} มีได้ไม่เกิน 100 รายการ`);
  const ids = new Set<string>();
  return value.map((item, index) => {
    const event = record(item, `${label} ${index + 1}`);
    const id = text(event.id, "รหัสรายการ", 80);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id) || ids.has(id))
      throw new Error(
        "รหัสรายการต้องไม่ซ้ำ ใช้ตัวอักษรอังกฤษตัวเล็ก ตัวเลข หรือขีดกลาง",
      );
    ids.add(id);
    const deadline = text(event.deadline, "วันปิดรับสมัคร", 10);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(deadline) ||
      !Number.isFinite(Date.parse(deadline)) ||
      new Date(deadline).toISOString().slice(0, 10) !== deadline
    )
      throw new Error("ตรวจสอบวันปิดรับสมัคร");
    if (typeof event.visible !== "boolean")
      throw new Error("ตรวจสอบสถานะการแสดงรายการ");
    return {
      id,
      title: text(event.title, "ชื่อรายการ", 150),
      description: text(event.description, "รายละเอียด", 600),
      schedule: text(event.schedule ?? "", "วันและเวลา", 200, true),
      price: text(event.price, "ราคา", 100),
      deadline,
      signupUrl: httpsUrl(event.signupUrl ?? "", "ลิงก์สมัคร", true),
      poster: imagePath(event.poster, "โปสเตอร์"),
      thumbnail: imagePath(event.thumbnail, "ภาพย่อ"),
      width: number(event.width, "ความกว้างรูป", 8192) || 1080,
      height: number(event.height, "ความสูงรูป", 8192) || 1350,
      visible: event.visible,
    };
  });
}

export function validateHubContent(value: unknown): HubContent {
  const content = record(value, "เนื้อหา");
  const settings = record(content.settings, "การตั้งค่าหน้า");
  const socials = record(settings.socials, "ช่องทางโซเชียล");
  const prices = record(content.prices, "ราคาเรียน");
  const result = structuredClone(defaultHubContent);
  for (const key of [
    "heading",
    "description",
    "bannerAlt",
    "campsHeading",
    "campsDescription",
    "campsMonth",
    "competitionsHeading",
    "competitionsDescription",
    "competitionsMonth",
    "competitionNote",
  ] as const) {
    result.settings[key] = text(
      settings[key],
      key,
      1000,
      key === "competitionNote",
    );
  }
  result.settings.banner = imagePath(settings.banner, "แบนเนอร์");
  result.settings.bannerWidth =
    number(settings.bannerWidth, "ความกว้างแบนเนอร์", 8192) || 1280;
  result.settings.bannerHeight =
    number(settings.bannerHeight, "ความสูงแบนเนอร์", 8192) || 534;
  result.settings.lineUrl = httpsUrl(settings.lineUrl, "LINE");
  for (const key of ["facebook", "instagram", "tiktok", "youtube"] as const)
    result.settings.socials[key] = httpsUrl(socials[key], key);
  for (const type of ["solo", "group"] as const) {
    const lesson = record(prices[type], type);
    for (const mode of ["online", "onsite"] as const) {
      const values = lesson[mode];
      if (!Array.isArray(values) || values.length !== 3)
        throw new Error("กรอกราคาเรียนให้ครบทั้ง 3 แพ็กเกจ");
      result.prices[type][mode] = values.map((price) =>
        number(price, "ราคาเรียน"),
      );
    }
  }
  result.camps = events(content.camps, "ค่าย");
  result.competitions = events(content.competitions, "งานแข่ง");
  return result;
}
