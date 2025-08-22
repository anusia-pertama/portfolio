"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { RefObject } from "react";
import { ProjectItem } from "../types";

export function ProjectModal({
  project,
  onClose,
  overlayRef,
  cardRef,
}: {
  project: ProjectItem;
  onClose: () => void;
  overlayRef: RefObject<HTMLDivElement | null>;
  cardRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4"
      ref={overlayRef}
      onClick={onClose}
    >
      <Card
        ref={cardRef as any}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="relative w-full max-w-3xl h-fit overflow-hidden rounded-xl bg-background  foreground shadow-2xl pt-0"
      >
        {/* Content */}
        {/* Top Image */}
        <div className="relative w-full h-50 md:h-96 bg-background">
          <Image
            src={project.hd_image || "/placeholder/project-cover.jpg"}
            alt={project.title}
            fill
            className="object-contain rounded-t-xl"
          />
        </div>

        <CardContent className="space-y-4">
          <CardTitle className="text-foreground/80 md:text-3xl font-bold">
            {project.title}
          </CardTitle>

          {/* Tags / Chips */}
          <div className="flex flex-wrap gap-2 text-[10px] md:text-xs">
            {project.release_date_option === "date" && project.release_date && (
              <span className="rounded bg-foreground/40 text-background px-2 py-1">
                {new Date(project.release_date).getFullYear()}
              </span>
            )}
            {project.release_date_option !== "date" && (
              <span className="rounded bg-foreground/40 text-background px-2 py-1">
                {project.release_date_option}
              </span>
            )}
            <span className="rounded bg-foreground/40 text-background px-2 py-1">
              {project.category}
            </span>
            <span className="rounded bg-foreground/40 text-background px-2 py-1">
              {project.status}
            </span>
          </div>

          {/* Summary */}
          <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
            {project.summary}
          </p>
        </CardContent>

        <CardFooter className="flex justify-start">
          {project.status === "undisclosed" ? (
            <>
              <Button
                disabled
                className="bg-primary hover:bg-primary-foreground text-foreground text-sm md:text-lg md:px-4 md:py-2 "
              >
                Coming soon
              </Button>
            </>
          ) : (
            <>
              <Button className="bg-primary hover:bg-primary-foreground text-foreground text-sm md:text-lg md:px-4 md:py-2 ">
                More info
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
