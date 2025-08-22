"use client";
import { ProjectItem } from "@/app/types";
import { useCallback, useRef, useState } from "react";

const gsapPromise: Promise<any> = import("gsap").then(
  (m: any) => m.gsap ?? m.default ?? m
);

export function useProjectModal() {
  const [item, setItem] = useState<ProjectItem | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const open = useCallback((item: ProjectItem) => {
    setItem(item);
    // Give React time to mount, then animate
    requestAnimationFrame(() => {
      gsapPromise.then((gsap) => {
        const overlay = overlayRef.current;
        const card = cardRef.current;
        if (overlay)
          gsap.fromTo(
            overlay,
            { opacity: 0 },
            { opacity: 1, duration: 0.25, ease: "power2.out" }
          );
        if (card)
          gsap.fromTo(
            card,
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, ease: "power3.out" }
          );
      });
    });
  }, []);

  const close = useCallback(() => {
    const overlay = overlayRef.current;
    const card = cardRef.current;
    gsapPromise.then((gsap) => {
      const tl = gsap.timeline({ onComplete: () => setItem(null) });
      if (card)
        tl.to(card, { y: 24, opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
      if (overlay)
        tl.to(overlay, { opacity: 0, duration: 0.2, ease: "power2.in" }, 0);
    });
  }, []);

  return { item, open, close, overlayRef, cardRef } as const;
}
