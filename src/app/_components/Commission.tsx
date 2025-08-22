"use client";
import { RefObject } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stringsMenu } from "@/placeholders/strings";
import Image from "next/image";

export function Commission({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLDivElement>;
}) {
  const commission = stringsMenu.commission || null;

  if (!commission) {
    return null;
  }

  return (
    <section
      ref={sectionRef as RefObject<HTMLDivElement | null>}
      className="container mx-auto px-4 sm:px-6 py-16 md:py-24 snap-start reveal-on-view"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {stringsMenu.commission.title}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {stringsMenu.commission.description}
        </p>
      </div>

      {/* Commission Tiers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {stringsMenu.commission.tiers.map((tier) => (
          <Card
            key={tier.title}
            className="bg-card/60 border-border/40 hover:border-primary/30 transition-all duration-300 group h-full flex flex-col"
          >
            <CardHeader className="pb-4 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tier.title}
                </CardTitle>
                <span className="text-primary font-bold text-sm bg-primary/15 px-3 py-1 rounded-full whitespace-nowrap">
                  {tier.price}
                </span>
              </div>
              <CardDescription className="text-sm leading-relaxed min-h-[40px]">
                {tier.description}
              </CardDescription>
            </CardHeader>

            {tier.sample && (
              <CardContent className="pt-0 flex-grow flex flex-col">
                <div className="relative aspect-square overflow-hidden rounded-lg border border-border/30 mb-3 flex-grow">
                  <Image
                    src={tier.sample}
                    alt={`Sample of ${tier.title}`}
                    width={300}
                    height={300}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* CTA Button */}
      <div className="text-center mt-12">
        <a
          href={`mailto:${stringsMenu.website.email}`}
          className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl"
        >
          Contact for Commission
        </a>
      </div>
    </section>
  );
}
