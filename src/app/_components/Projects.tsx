"use client";

import { RefObject, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ProjectItem,
  LocalProjectItem,
  ProjectStatus,
  ProjectCategory,
} from "../types";
import { getProjects } from "../actions/supabase";
import { ProjectCardSkeleton } from "./skeleton/projectSkeleton";
import { stringsMenu } from "@/placeholders/strings";

const isUsingSupabase = process.env.NEXT_PUBLIC_ISUSING_SUPABASE === "true";
const ITEMS_PER_PAGE_DESKTOP = 6;
const ITEMS_PER_PAGE_MOBILE = 3;

const projectsMenu = stringsMenu.projects ?? {
  title: "Projects",
  category: ["Anime", "Game", "Manga", "Movie"],
  description: "",
  buttons: [{ text: "View More", href: "#" }],
  localFiles: [],
};

const localFiles: LocalProjectItem[] = projectsMenu.localFiles ?? [];

// Map local files to ProjectItem structure
export const mappedLocalFiles: ProjectItem[] = localFiles.map((f, i) => ({
  id: `local-${i}`,
  title: f.title,
  status: f.status,
  category: f.category,
  summary: f.summary,
  release_date_option: f.release_date_option,
  release_date: f.release_date ?? null,
  progress: f.progress,
  hd_image: f.image ?? "/placeholders/project-cover.jpg",
  thumbnail: f.image ?? "/placeholders/project-cover.jpg",
}));

// Custom hook to detect mobile screens
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add event listener
    window.addEventListener("resize", checkIsMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}

export function Projects({
  sectionRef,
  onOpen,
  projectFilter,
  setProjectFilter,
}: {
  sectionRef: RefObject<HTMLDivElement>;
  onOpen: (item: ProjectItem) => void;
  projectFilter: "All" | "Anime" | "Game" | "Manga" | "Movie";
  setProjectFilter: (v: "All" | "Anime" | "Game" | "Manga" | "Movie") => void;
}) {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();

  // Use different items per page based on screen size
  const ITEMS_PER_PAGE = isMobile
    ? ITEMS_PER_PAGE_MOBILE
    : ITEMS_PER_PAGE_DESKTOP;

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (isUsingSupabase) {
        const projects = await getProjects();
        setItems(projects);
      } else {
        setItems(mappedLocalFiles);
      }
      setLoading(false);
    })();
  }, []);

  const filteredItems = items.filter(
    (item) => projectFilter === "All" || item.category === projectFilter
  );

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Reset to page 1 when filter changes or screen size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [projectFilter, isMobile]);

  // Loading Skeleton
  if (loading) {
    return (
      <section className="container mx-auto px-6 py-24 snap-start">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            {projectsMenu.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            {(["All", "Anime", "Game", "Manga", "Movie"] as const).map(
              (tab) => (
                <Button
                  key={tab}
                  variant={projectFilter === tab ? "secondary" : "ghost"}
                  className="rounded-full text-xs sm:text-sm"
                  onClick={() => setProjectFilter(tab)}
                >
                  {tab}
                </Button>
              )
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <ProjectCardSkeleton key={i} i={i} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-40 rounded-full bg-muted" />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="container mx-auto px-6 py-24 snap-start reveal-on-view"
    >
      {/* Header + Tabs */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">{projectsMenu.title}</h2>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          {(["All", "Anime", "Game", "Manga", "Movie"] as const).map((tab) => (
            <Button
              key={tab}
              variant={projectFilter === tab ? "secondary" : "ghost"}
              className="rounded-full text-xs sm:text-sm"
              onClick={() => {
                setProjectFilter(tab);
                setCurrentPage(1);
              }}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((p) => (
            <div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60 cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => onOpen(p)}
            >
              <div className="relative">
                <Image
                  src={p.hd_image ?? "/placeholders/project-cover.jpg"}
                  alt={p.title}
                  width={800}
                  height={450}
                  className="aspect-video w-full object-contain"
                />
                <div className="absolute left-3 top-3 rounded-full bg-background/70 px-3 py-1 text-xs text-foreground ring-1 ring-foreground/60">
                  {p.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-1">
                  {p.title}
                </h3>
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      p.status === "released" ? "text-primary" : "text-accent"
                    }
                  >
                    {p.status}
                  </span>
                </p>
                {p.summary && (
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {p.summary}
                  </p>
                )}
              </div>
              <div className="px-4 pb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  size={isMobile ? "sm" : "default"}
                  onClick={() => onOpen(p)}
                >
                  View Details
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-border/60 bg-card/60 aspect-[3/1]">
            <p className="text-muted-foreground">No projects found</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center gap-2">
          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Prev
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              variant={currentPage === i + 1 ? "default" : "outline"}
              size={isMobile ? "sm" : "default"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outline"
            size={isMobile ? "sm" : "default"}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Footer CTA */}
      <div className="mt-8 flex justify-center">
        <Link
          href={projectsMenu.buttons?.[0]?.href ?? "#"}
          target={projectsMenu.buttons?.[0]?.target ?? "_blank"}
        >
          <Button size={isMobile ? "default" : "lg"}>
            {projectsMenu.buttons?.[0]?.text ?? "View More"}
          </Button>
        </Link>
      </div>
    </section>
  );
}
