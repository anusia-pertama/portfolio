"use client";
import { useLayoutEffect } from "react";

const gsapPromise: Promise<any> = import("gsap").then(
  (m: any) => m.gsap ?? m.default ?? m
);

export function useGsapGlobalEffects() {
  useLayoutEffect(() => {
    let ctx: any;
    let onMove: ((e: PointerEvent) => void) | null = null;
    let onScroll: (() => void) | null = null;
    let revealObserver: IntersectionObserver | null = null;

    gsapPromise.then((gsap) => {
      ctx = gsap.context(() => {
        // ✅ Reveal-on-load only if .reveal exists
        const revealEls = document.querySelectorAll(".reveal");
        if (revealEls.length > 0) {
          gsap.fromTo(
            revealEls,
            { y: 24, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              stagger: 0.08,
              ease: "power3.out",
            }
          );
        }

        // ✅ Reveal on view (.reveal-on-view)
        const toReveal = Array.from(
          document.querySelectorAll(".reveal-on-view")
        );
        if (toReveal.length > 0) {
          toReveal.forEach((el) =>
            gsap.set(el as Element, { opacity: 0, y: 20 })
          );

          revealObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                const el = entry.target as Element;
                if (entry.isIntersecting) {
                  gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                  });
                  revealObserver?.unobserve(el);
                }
              });
            },
            { threshold: 0.2 }
          );

          toReveal.forEach((el) => revealObserver?.observe(el));
        }

        // ✅ Cursor glow follow
        const glow = document.getElementById("cursor-glow");
        if (glow) {
          onMove = (e: PointerEvent) => {
            gsap.to(glow, {
              x: e.clientX,
              y: e.clientY,
              duration: 0.2,
              ease: "power2.out",
              overwrite: "auto",
            });
          };
          window.addEventListener("pointermove", onMove);
        }

        // ✅ Parallax layers by ID
        const l1 = document.getElementById("parallax-a");
        const l2 = document.getElementById("parallax-b");
        const l3 = document.getElementById("parallax-c");
        onScroll = () => {
          const y = window.scrollY || 0;
          if (l1)
            gsap.to(l1, { y: y * 0.05, duration: 0.3, ease: "power1.out" });
          if (l2)
            gsap.to(l2, { y: y * 0.09, duration: 0.3, ease: "power1.out" });
          if (l3)
            gsap.to(l3, { y: y * 0.12, duration: 0.3, ease: "power1.out" });
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
      });
    });

    return () => {
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (onScroll)
        window.removeEventListener("scroll", onScroll as EventListener);
      revealObserver?.disconnect();
      ctx && ctx.revert && ctx.revert();
    };
  }, []);
}
