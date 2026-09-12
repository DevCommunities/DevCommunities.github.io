import { useState, type ReactNode } from "react";
import { navdata } from "../../../data/data";
export default function NavContainer({ children }: { children: ReactNode }) {
  return (
    <nav
      aria-label="เมนูหลัก"
      className="bg-secondary shadow fixed w-full z-50"
    >
      <div className="mx-auto max-w-7xl px-5 py-3 flex justify-between items-center">
        <a
          href="/"
          aria-label="DevCommu หน้าแรก"
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/favicon.svg"
            alt="DevCommu Logo"
            width="34"
            height="34"
            className="transition-transform group-hover:scale-105"
          />
          <div className="h-8 w-28 md:w-32 bg-no-repeat bg-[url('/images/branding/devcommu-word-dark.webp')] bg-center bg-contain transition-opacity group-hover:opacity-80"></div>
        </a>
        {children}
      </div>
    </nav>
  );
}
function LineIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

export function NavListContainer({
  children,
  pathName,
}: {
  children?: ReactNode;
  pathName: string;
}) {
  const [open, setOpen] = useState(false);
  const links = navdata.map((item) => {
    const href = String(item.href);
    const active = href === "/" ? pathName === "/" : pathName.startsWith(href);
    return (
      <a
        key={href}
        href={href}
        aria-current={active ? "page" : undefined}
        className={
          "px-3.5 py-2 rounded-full font-medium transition-colors " +
          (active
            ? "bg-white text-pink-700 shadow-sm"
            : "text-slate-700 hover:text-pink-700 hover:bg-white/50")
        }
      >
        {item.title}
      </a>
    );
  });

  return (
    <div className="font-lineSansTH">
      <div className="flex items-center gap-2.5 sm:gap-3.5">
        {children}

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center bg-slate-200/90 rounded-full p-1 shadow-inner text-sm">
          {links}
        </div>

        {/* Free Consultation Button (Desktop) */}
        <a
          href="https://line.me/R/ti/p/@468httmq"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ปรึกษาฟรีทาง LINE: @468httmq"
          className="hidden md:inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#e57192] to-[#d64f78] hover:from-[#d64f78] hover:to-[#be3e65] text-white font-lineSansTH_XB text-sm lg:text-base shadow-sm shadow-pink-500/20 hover:shadow-md hover:shadow-pink-500/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 whitespace-nowrap"
          title="ปรึกษาฟรีทาง LINE: @468httmq"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <LineIcon className="w-4 h-4 fill-white shrink-0" />
          <span>ปรึกษาฟรี</span>
        </a>

        {/* Free Consultation Button (Mobile Header) */}
        <a
          href="https://line.me/R/ti/p/@468httmq"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="ปรึกษาฟรีทาง LINE: @468httmq"
          className="md:hidden inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#e57192] to-[#d64f78] text-white font-lineSansTH_XB text-xs sm:text-sm shadow-sm shadow-pink-500/20 active:scale-95 transition-all whitespace-nowrap"
          title="ปรึกษาฟรีทาง LINE: @468httmq"
        >
          <LineIcon className="w-3.5 h-3.5 fill-white shrink-0" />
          <span>ปรึกษาฟรี</span>
        </a>

        {/* Mobile Menu Toggle Button */}
        <button
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className="md:hidden bg-slate-200 hover:bg-slate-300 active:bg-slate-400 rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-slate-700 transition-colors"
        >
          {open ? "ปิด ×" : "เมนู ☰"}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-xl border-b border-slate-200/80 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
      >
        <div className="flex flex-col gap-1.5 mb-4 text-base font-medium">
          {links}
        </div>
        <a
          href="https://line.me/R/ti/p/@468httmq"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#e57192] to-[#d64f78] hover:from-[#d64f78] hover:to-[#be3e65] text-white font-lineSansTH_XB text-sm sm:text-base shadow-sm shadow-pink-500/20 active:scale-95 transition-all"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <LineIcon className="w-4 h-4 fill-white shrink-0" />
          <span>ปรึกษาฟรีทาง LINE: @468httmq</span>
        </a>
      </div>
    </div>
  );
}
