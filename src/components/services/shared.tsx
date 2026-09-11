import { type ReactNode } from "react";
import { motion } from "framer-motion";
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25 }}
      className={`dc-card ${className}`.trim()}
    >
      {children}
    </motion.article>
  );
}
export function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="dc-heading">
      <p className="text-primary font-bold">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="dc-muted">{children}</p>
    </header>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <p role="status" className="dc-notice">
      {children}
    </p>
  );
}
