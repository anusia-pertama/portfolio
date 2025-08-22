"use client";
import { useEffect, useRef, useState } from "react";
import { useGsapGlobalEffects } from "@/hooks/useGsapGlobalEffects";
import { useProjectModal } from "@/hooks/useProjectModal";
import { useArtworkModal } from "@/hooks/useArtworkModal";
import { Hero } from "./_components/Hero";
import { Projects } from "./_components/Projects";
import { ProjectModal } from "./_components/ProjectModal";
import { ArtworkModal } from "./_components/PortfolioModal";
import { Commission } from "./_components/Commission";
import { SiteFooter } from "./_components/SiteFooter";
import { Navbar } from "./_components/Navbar";
import { Portfolio } from "./_components/portfolio";

const gsapPromise = import("gsap").then((m: any) => m.gsap ?? m.default ?? m);

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const commissionRef = useRef<HTMLDivElement>(null);

  const [activeFilter, setActiveFilter] = useState<
    "All" | "Fan Art" | "Personal" | "Commission" | "Collaboration"
  >("All");
  const [projectFilter, setProjectFilter] = useState<
    "All" | "Anime" | "Game" | "Manga" | "Movie"
  >("All");

  useGsapGlobalEffects();
  const [mounted, setMounted] = useState(false);
  const projectModal = useProjectModal();
  const artworkModal = useArtworkModal();

  // Portfolio reveal effect
  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    let isCancelled = false;
    const selector = "#portfolio [data-portfolio-item]";

    gsapPromise.then((gsap: any) => {
      if (isCancelled) return;
      const items = Array.from(document.querySelectorAll(selector));
      items.forEach((el) => gsap.set(el as Element, { opacity: 0, y: 24 }));

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const idx = items.indexOf(entry.target);
              gsap.to(entry.target, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out",
                delay: Math.max(0, idx) * 0.1,
              });
              observer?.unobserve(entry.target as Element);
            }
          });
        },
        { root: null, threshold: 0.25 }
      );

      items.forEach((el) => observer?.observe(el));
    });

    return () => {
      isCancelled = true;
      observer?.disconnect();
    };
  }, [activeFilter]);

  // Global GSAP effects (cursor glow, parallax, modal open animation)
  useEffect(() => {
    let ctx: any;
    let onMove: ((e: PointerEvent) => void) | null = null;
    let onScroll: (() => void) | null = null;

    gsapPromise.then((gsap: any) => {
      ctx = gsap.context(() => {
        gsap.fromTo(
          ".reveal",
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
        );

        // Cursor glow
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
      });
    });

    return () => {
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (onScroll)
        window.removeEventListener("scroll", onScroll as EventListener);
      ctx && ctx.revert && ctx.revert();
    };
  }, []);
  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground overflow-hidden transition-colors duration-500">
      <Navbar />

      {/* Custom Cursor Glow */}
      <div className="hidden md:block pointer-events-none fixed inset-0 z-[60] mix-blend-screen">
        <div
          className="absolute size-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl will-change-transform"
          id="cursor-glow"
        />
      </div>

      <div id="hero">
        <Hero sectionRef={heroRef} />
      </div>

      <div id="portfolio">
        <Portfolio
          sectionRef={portfolioRef as React.RefObject<HTMLDivElement>}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onOpenDetail={(item) => artworkModal.open(item)}
        />
      </div>

      <div id="projects">
        <Projects
          sectionRef={projectsRef as React.RefObject<HTMLDivElement>}
          onOpen={(i) => projectModal.open(i)}
          projectFilter={projectFilter}
          setProjectFilter={setProjectFilter}
        />
      </div>

      {/* Project Modal */}
      {isClient && projectModal.item && (
        <ProjectModal
          project={projectModal.item}
          onClose={projectModal.close}
          overlayRef={
            projectModal.overlayRef as React.RefObject<HTMLDivElement>
          }
          cardRef={projectModal.cardRef as React.RefObject<HTMLDivElement>}
        />
      )}

      {/* Artwork Modal */}
      {isClient && artworkModal.item && (
        <ArtworkModal
          item={artworkModal.item}
          onClose={artworkModal.close}
          overlayRef={artworkModal.overlayRef}
          cardRef={artworkModal.cardRef}
        />
      )}

      <div id="commission">
        <Commission
          sectionRef={commissionRef as React.RefObject<HTMLDivElement>}
        />
      </div>
      <SiteFooter />
    </div>
  );
}
