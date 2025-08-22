"use client";

import { RefObject, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { LocalPortfolioItem, PortfolioItem } from "../types";
import { getGallery } from "../actions/supabase";
import { PortfolioSkeletonCard } from "./skeleton/portfolioSkeleton";
import { stringsMenu } from "@/placeholders/strings";

const isUsingSupabase = process.env.NEXT_PUBLIC_ISUSING_SUPABASE === "true";
const ITEMS_PER_PAGE_DESKTOP = 6;
const ITEMS_PER_PAGE_MOBILE = 3;

const localFiles: LocalPortfolioItem[] = stringsMenu.portfolio.localFiles ?? [];

// local fallback portfolio items
export const mappedLocalFiles: PortfolioItem[] = localFiles.map((f, i) => ({
  id: `local-${i}`,
  title: f.title,
  description: f.description ?? null,
  date: f.date ?? null,
  thumbnail: f.image,
  hd_image: f.image,
  timelapse_gif: f.timelapse_gif ?? null,
  timelapse_url: f.timelapse_url ?? null,
  psd_file: f.psd_file ?? null,
  created_at: null,
  category: f.category,
  client: f.client ?? null,
  client_account: f.client_account ?? null,
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

export function Portfolio({
  sectionRef,
  activeFilter,
  setActiveFilter,
  onOpenDetail,
}: {
  sectionRef: RefObject<HTMLDivElement | null>;
  activeFilter: "All" | "Fan Art" | "Personal" | "Commission" | "Collaboration";
  setActiveFilter: (
    v: "All" | "Personal" | "Fan Art" | "Commission" | "Collaboration"
  ) => void;
  onOpenDetail: (item: PortfolioItem) => void;
}) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();

  // Use different items per page based on screen size
  const ITEMS_PER_PAGE = isMobile
    ? ITEMS_PER_PAGE_MOBILE
    : ITEMS_PER_PAGE_DESKTOP;

  const filteredItems = items.filter(
    (item) =>
      activeFilter === "All" ||
      item.category.toLowerCase() === activeFilter.toLowerCase()
  );

  // Calculate paginated items
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  useEffect(() => {
    (async () => {
      if (isUsingSupabase) {
        const gallery = await getGallery();
        setItems(gallery);
      } else {
        setItems(mappedLocalFiles);
      }
    })();
  }, []);

  // Reset to page 1 when filter changes or screen size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter, isMobile]);

  if (items.length === 0) {
    return (
      <section
        id="portfolio"
        ref={sectionRef}
        className="container mx-auto px-6 py-24 snap-start reveal-on-view"
      >
        {/* Header + Tabs */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            {stringsMenu.portfolio.title}
          </h2>
          <div className="flex gap-2">
            {(
              [
                "All",
                "Fan Art",
                "Personal",
                "Commission",
                "Collaboration",
              ] as const
            ).map((tab) => (
              <Button
                key={tab}
                variant={activeFilter === tab ? "secondary" : "ghost"}
                className="rounded-full"
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal-on-view">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <PortfolioSkeletonCard key={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8 flex justify-center">
          <Skeleton className="h-10 w-40 rounded-full bg-muted" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="container mx-auto px-6 py-24 snap-start reveal-on-view"
    >
      {/* Header + Tabs */}
      <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          {stringsMenu.portfolio.title}
        </h2>
        <div className="flex flex-wrap justify-center gap-2">
          {(
            [
              "All",
              "Fan Art",
              "Personal",
              "Commission",
              "Collaboration",
            ] as const
          ).map((tab) => (
            <Button
              key={tab}
              variant={activeFilter === tab ? "secondary" : "ghost"}
              className="rounded-full text-xs sm:text-sm"
              onClick={() => setActiveFilter(tab)}
            >
              {tab}
            </Button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal-on-view">
        {paginatedItems.length > 0 ? (
          paginatedItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/60"
              data-portfolio-item
              role="button"
              tabIndex={0}
              onClick={() => onOpenDetail(item)}
            >
              <div className="relative w-full aspect-[16/9]">
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                {item.timelapse_gif && (
                  <Image
                    src={item.timelapse_gif}
                    alt={`${item.title} timelapse`}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100 scale-105"
                  />
                )}
              </div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 transition-opacity group-hover:opacity-100 cursor-pointer">
                {item.date && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                )}
                <p className="text-foreground font-semibold">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.client && (
                  <p className="text-xs text-muted-foreground">
                    Client: {item.client}{" "}
                    {item.client_account && `(@${item.client_account})`}
                  </p>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex items-center justify-center rounded-2xl border border-border/60 bg-card/60 aspect-[5/1]">
            <p className="text-muted-foreground">No items found</p>
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
        <Link href={stringsMenu.portfolio.buttons[0].href} target="_blank">
          <Button size={isMobile ? "default" : "lg"}>
            {stringsMenu.portfolio.buttons[0].text}
          </Button>
        </Link>
      </div>
    </section>
  );
}
