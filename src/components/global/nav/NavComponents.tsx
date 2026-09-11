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
          <div className="h-8 w-28 md:w-32 bg-no-repeat bg-[url('/images/DarkDevCommuWord.png')] bg-center bg-contain transition-opacity group-hover:opacity-80"></div>
        </a>
        {children}
      </div>
    </nav>
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
          "px-3 py-2 rounded-full hover:text-pink-700 " +
          (active ? "bg-white text-pink-700" : "text-gray-800")
        }
      >
        {item.title}
      </a>
    );
  });
  return (
    <div className="font-lineSansTH text-sm">
      {children}
      <div className="hidden md:flex items-center bg-slate-200 rounded-full p-1">
        {links}
      </div>
      <button
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen(!open)}
        className="md:hidden bg-slate-200 rounded-full px-5 py-2"
      >
        {open ? "ปิดเมนู ×" : "เมนู ☰"}
      </button>
      <div
        id="mobile-nav"
        hidden={!open}
        className="md:hidden absolute top-full left-0 w-full bg-secondary shadow-lg p-4"
      >
        <div className="flex flex-col gap-2">{links}</div>
      </div>
    </div>
  );
}
