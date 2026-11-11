export {};
const form = document.querySelector<HTMLFormElement>("#password-login")!;
const password = document.querySelector<HTMLInputElement>("#login-password")!;
document
  .querySelector("#show-password")!
  .addEventListener("change", (event) => {
    password.type = (event.target as HTMLInputElement).checked
      ? "text"
      : "password";
  });
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const error = document.querySelector<HTMLElement>("#login-error")!;
  const status = document.querySelector<HTMLElement>("#login-status")!;
  const button = form.querySelector<HTMLButtonElement>("button[type=submit]")!;
  const values = new FormData(form);
  error.hidden = true;
  button.disabled = true;
  button.textContent = "กำลังเข้าสู่ระบบ…";
  status.textContent = "กำลังตรวจสอบบัญชี";
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      credentials: "same-origin",
      redirect: "error",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: values.get("username"),
        password: values.get("password"),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "เข้าสู่ระบบไม่สำเร็จ");
    password.value = "";
    location.assign("/admin/");
  } catch (cause) {
    error.textContent =
      cause instanceof TypeError || cause instanceof SyntaxError
        ? "เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่"
        : cause instanceof Error
        ? cause.message
        : "เชื่อมต่อไม่สำเร็จ กรุณาลองใหม่";
    error.hidden = false;
    status.textContent = "";
    button.disabled = false;
    button.textContent = "เข้าสู่ระบบ";
  }
});
