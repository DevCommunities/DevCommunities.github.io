import type { EditableEvent } from "./hub-content.ts";

export function escapeHtml(value: string | number): string {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ]!,
  );
}

export const arrowIcon =
  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>';
const chevronIcon =
  '<svg class="hub-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

export function renderEvents(
  events: EditableEvent[],
  lineUrl: string,
  today: string,
): string {
  const visible = events.filter((event) => event.visible);
  if (!visible.length)
    return '<p class="hub-note">ยังไม่มีรายการในหมวดนี้ ติดตามข่าวสารได้ทางช่องทางของ DevCommu</p>';
  return visible
    .map((event) => {
      const closed = event.deadline < today;
      const date = new Intl.DateTimeFormat("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Bangkok",
      }).format(new Date(`${event.deadline}T12:00:00+07:00`));
      const title = escapeHtml(event.title);
      const signup =
        event.signupUrl && !closed
          ? `<a class="hub-action hub-action-primary" data-event-signup href="${escapeHtml(event.signupUrl)}" target="_blank" rel="noopener noreferrer">สมัครค่ายนี้ ${arrowIcon}</a>`
          : "";
      const contact = event.signupUrl
        ? `<a class="hub-action" href="${escapeHtml(lineUrl)}" target="_blank" rel="noopener noreferrer">สอบถามรายละเอียดทาง LINE ${arrowIcon}</a>`
        : "";
      return `<details class="hub-event" data-deadline="${escapeHtml(event.deadline)}">
      <summary>
        <img class="hub-thumbnail" src="${escapeHtml(event.thumbnail)}" width="64" height="88" alt="" loading="lazy" decoding="async">
        <span class="hub-event-copy"><strong>${title}</strong>
          ${event.schedule ? `<span>${escapeHtml(event.schedule)}</span>` : ""}
          <span>${escapeHtml(event.description)}</span><span class="hub-event-price">${escapeHtml(event.price)}</span>
          <span class="hub-event-deadline">ปิดรับสมัคร <time datetime="${escapeHtml(event.deadline)}">${escapeHtml(date)}</time></span>
          <span class="hub-closed" data-event-closed ${closed ? "" : "hidden"}>ปิดรับสมัครแล้ว</span>
        </span>${chevronIcon}
      </summary>
      <div class="hub-event-body"><a class="hub-poster" href="${escapeHtml(event.poster)}" target="_blank" rel="noopener noreferrer" aria-label="ดูโปสเตอร์ ${title} ขนาดเต็ม (เปิดแท็บใหม่)">
        <img src="${escapeHtml(event.poster)}" width="${event.width}" height="${event.height}" alt="โปสเตอร์ ${title}" loading="lazy" decoding="async">
        <span>ดูโปสเตอร์ขนาดเต็ม ${arrowIcon}</span></a>${signup}${contact}
      </div></details>`;
    })
    .join("");
}

export function renderPrices(
  prices: { online: number[]; onsite: number[] },
  group: boolean,
): string {
  const plans = [
    "รายชั่วโมง",
    "รายเดือน สัปดาห์ละ 1 ครั้ง",
    "รายเดือน สัปดาห์ละ 2 ครั้ง",
  ];
  return `<caption>ราคาเป็นบาท${group ? "ต่อคน" : ""}</caption><thead><tr><th scope="col">รูปแบบ</th><th scope="col">ออนไลน์</th><th scope="col">ออนไซต์</th></tr></thead><tbody>${plans.map((plan, index) => `<tr><th scope="row">${plan}</th><td>${prices.online[index].toLocaleString("en-US")}</td><td>${prices.onsite[index].toLocaleString("en-US")}</td></tr>`).join("")}</tbody>`;
}
