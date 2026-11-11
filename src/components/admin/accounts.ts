import { escapeHtml } from "../../lib/hub-render";
type Account = {
  id: string;
  username: string;
  enabled: boolean;
  createdAt: string;
};
const error = document.querySelector<HTMLElement>("#accounts-error")!;
const status = document.querySelector<HTMLElement>("#accounts-status")!;
const issued = document.querySelector<HTMLElement>("#account-credentials")!;
const username = document.querySelector<HTMLInputElement>("#issued-username")!;
const password = document.querySelector<HTMLInputElement>("#issued-password")!;
let busy = false;
let hasCredentials = false;
function dismiss() {
  username.value = "";
  password.value = "";
  issued.hidden = true;
  hasCredentials = false;
}
function render(accounts: Account[]) {
  document.querySelector<HTMLElement>("#accounts-list")!.innerHTML = accounts
    .map(
      (a) =>
        `<article class="admin-account-row"><div><h3>${escapeHtml(a.username)}</h3><p>${a.enabled ? "ใช้งานอยู่" : "ปิดใช้งานแล้ว"}</p></div><div class="admin-account-actions"><button type="button" data-account="${escapeHtml(a.id)}" data-action="reset">สร้างรหัสผ่านใหม่</button><button type="button" data-account="${escapeHtml(a.id)}" data-action="${a.enabled ? "disable" : "enable"}">${a.enabled ? "ปิดบัญชี" : "เปิดบัญชีอีกครั้ง"}</button></div></article>`,
    )
    .join("");
  status.textContent = accounts.length
    ? `${accounts.length} บัญชี · ปิดบัญชีหรือสร้างรหัสผ่านใหม่เพื่อยกเลิก session เดิมทันที`
    : "ยังไม่มีบัญชี สร้างบัญชีแรกเพื่อให้ผู้ร่วมงานเข้าสู่ระบบได้";
}
async function send(action?: string, value?: string) {
  if (busy) return;
  if (
    action &&
    hasCredentials &&
    !confirm("บันทึกรหัสผ่านที่แสดงแล้วหรือยัง? ดำเนินการต่อจะปิดข้อมูลนี้")
  )
    return;
  if (action) dismiss();
  busy = true;
  error.hidden = true;
  document
    .querySelectorAll<HTMLButtonElement>("button")
    .forEach((b) => (b.disabled = true));
  try {
    const response = await fetch("/api/admin/staff/accounts", {
      credentials: "same-origin",
      redirect: "error",
      ...(action
        ? {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action, value }),
          }
        : {}),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "โหลดข้อมูลไม่สำเร็จ");
    render(data.accounts);
    if (data.credentials) {
      username.value = data.credentials.username;
      password.value = data.credentials.password;
      issued.hidden = false;
      hasCredentials = true;
      issued.scrollIntoView({ block: "nearest" });
      document.querySelector<HTMLInputElement>("#create-account input")!.value =
        "";
    }
  } catch (cause) {
    error.textContent =
      cause instanceof TypeError || cause instanceof SyntaxError
        ? "เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่"
        : cause instanceof Error
        ? cause.message
        : "เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่";
    error.hidden = false;
  } finally {
    busy = false;
    document
      .querySelectorAll<HTMLButtonElement>("button")
      .forEach((b) => (b.disabled = false));
  }
}
document
  .querySelector<HTMLFormElement>("#create-account")!
  .addEventListener("submit", (event) => {
    event.preventDefault();
    send(
      "create",
      String(
        new FormData(event.currentTarget as HTMLFormElement).get("username"),
      ),
    );
  });
document.querySelector("#accounts-list")!.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
    "button[data-account]",
  );
  if (!button) return;
  const message =
    button.dataset.action === "reset"
      ? "สร้างรหัสผ่านใหม่และยกเลิก session เดิมของบัญชีนี้?"
      : button.dataset.action === "disable"
        ? "ปิดบัญชีนี้และยกเลิก session เดิมทันที?"
        : "เปิดบัญชีนี้อีกครั้ง?";
  if (confirm(message)) send(button.dataset.action, button.dataset.account);
});
document
  .querySelector("#dismiss-credentials")!
  .addEventListener("click", dismiss);
document
  .querySelector("#copy-credentials")!
  .addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(
        `เข้าสู่ระบบ: ${location.origin}/admin/\nชื่อผู้ใช้: ${username.value}\nรหัสผ่าน: ${password.value}`,
      );
      status.textContent = "คัดลอกข้อมูลเข้าสู่ระบบแล้ว";
    } catch {
      status.textContent =
        "คัดลอกอัตโนมัติไม่ได้ กรุณาคัดลอกชื่อผู้ใช้และรหัสผ่านจากช่องด้านบน";
    }
  });
window.addEventListener("beforeunload", (event) => {
  if (hasCredentials) event.preventDefault();
});
send();
