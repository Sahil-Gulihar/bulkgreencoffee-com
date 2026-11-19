"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
};

/** Fades + lifts its children into view once, the first time they scroll on screen. */
export function Reveal({ children, className, delay = 0, as: Tag = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  // Start visible so SSR / no-JS never hides content; arm the hidden state on mount.
  const [state, setState] = useState<"idle" | "armed" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setState("shown");
      return;
    }
    setState("armed");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(state === "armed" && "reveal", state === "shown" && "reveal is-visible", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
