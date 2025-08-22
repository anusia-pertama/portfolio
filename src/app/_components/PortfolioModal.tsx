"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { RefObject } from "react";
import { LocalPortfolioItem, PortfolioItem } from "../types";
import { Calendar, User, Link, Download } from "lucide-react";

export function ArtworkModal({
  item,
  onClose,
  overlayRef,
  cardRef,
}: {
  item: PortfolioItem;
  onClose: () => void;
  overlayRef: RefObject<HTMLDivElement | null>;
  cardRef: RefObject<HTMLDivElement | null>;
}) {
  console.log({ item });

  // Format date if available
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4"
      ref={overlayRef}
      onClick={onClose}
    >
      <Card
        className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-card"
        ref={cardRef as any}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{item.title}</CardTitle>
              <CardDescription className="text-base mt-2">
                {item.description || "No description available."}
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 rounded-full"
              aria-label="Close modal"
            >
              ×
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Main Image */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a href={item.hd_image} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.hd_image}
                  alt={item.title}
                  width={1920}
                  height={1080}
                  className="w-full rounded-xl object-contain cursor-pointer"
                />
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>View full resolution</p>
            </TooltipContent>
          </Tooltip>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            {/* Left Column - Basic Info */}
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 min-w-[120px]">
                  <span className="font-semibold text-sm">Category:</span>
                </div>
                <span className="px-3 py-1 bg-primary/15 text-primary rounded-full text-sm font-medium">
                  {item.category}
                </span>
              </div>

              {formattedDate && (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                      Created
                    </span>
                    <span className="font-medium">{formattedDate}</span>
                  </div>
                </div>
              )}

              {item.client && (
                <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <User className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-muted-foreground">
                      Client
                    </span>
                    <span className="font-medium">{item.client}</span>
                    {item.client_account && (
                      <Button
                        variant="link"
                        className="h-auto p-0 justify-start"
                        asChild
                      >
                        <a
                          href={item.client_account}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-primary border-1 border-primary p-1"
                        >
                          <Link className="h-3 w-3" />
                          <span className="text-sm">View Profile</span>
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Resources */}
            <div className="space-y-4">
              {item.timelapse_url && (
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 gap-3"
                  asChild
                >
                  <a
                    href={item.timelapse_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-lg">🎬</span>
                    <div className="flex flex-col items-start">
                      <span>Watch Timelapse</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        YouTube
                      </span>
                    </div>
                  </a>
                </Button>
              )}

              {item.timelapse_gif && (
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 gap-3"
                  asChild
                >
                  <a
                    href={item.timelapse_gif}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-lg">🖼️</span>
                    <div className="flex flex-col items-start">
                      <span>View Timelapse GIF</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        Animated
                      </span>
                    </div>
                  </a>
                </Button>
              )}

              {item.psd_file && (
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 gap-3"
                  asChild
                >
                  <a
                    href={item.psd_file}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="h-4 w-4" />
                    <div className="flex flex-col items-start">
                      <span>Download PSD File</span>
                      <span className="text-xs text-muted-foreground font-normal">
                        Photoshop
                      </span>
                    </div>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
