"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";
import Image from "next/image";
import { stringsMenu } from "@/placeholders/strings";

export function Hero({
  sectionRef,
}: {
  sectionRef: RefObject<HTMLDivElement | null>;
}) {
  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] snap-start reveal-on-view bg-amber-200"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute md:hidden inset-0 bg-[url('/assets/images/m-bg-light.png')] bg-cover bg-center dark:opacity-0 transition-opacity duration-1000" />
        <div className="absolute md:hidden inset-0 bg-[url('/assets/images/m-bg-dark.png')] bg-cover bg-center opacity-0 dark:opacity-100 transition-opacity duration-1000" />
        <div className="hidden md:block absolute inset-0 bg-[url('/assets/images/bg-light.png')] bg-cover bg-center dark:opacity-0 transition-opacity duration-1000" />
        <div className="hidden md:block absolute inset-0 bg-[url('/assets/images/bg-dark.png')] bg-cover bg-center opacity-0 dark:opacity-100 transition-opacity duration-1000" />
      </div>

      {/* get image from google drive */}
      {/* <div className="absolute inset-0 z-0">
        <Image
          src={
            "https://drive.usercontent.google.com/download?id=1UaGJ5ceBo1sPZWl-xpw837m57yPGhU6v"
          }
          alt="image"
          fill
          className="object-cover"
        />
      </div> */}

      {/* Hero content */}
      <div className=" relative w-full z-10 mx-auto md:px-12 md:py-24 p-4 flex justify-start gap-10 items-center ">
        {/* Mobile layout */}
        <div className="flex flex-col justify-end w-full h-full px-6 pb-12 space-y-4 md:hidden ">
          <span className="inline-flex items-center rounded-full bg-secondary/20 px-3 py-1 text-xs text-secondary-foreground/80 ring-1 ring-accent/40 w-fit">
            {stringsMenu.hero.components.tagline}
          </span>
          <h1 className="text-2xl sm:text-1xl font-extrabold tracking-tight text-foreground">
            <span className="block bg-gradient-to-r from-primary via-accent to-primary/60 dark:from-teal-300 bg-clip-text text-transparent">
              {stringsMenu.hero.components.title}
            </span>
          </h1>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href={stringsMenu.hero.components.buttons[0].href}>
              <Button size="sm">
                {stringsMenu.hero.components.buttons[0].text}
              </Button>
            </Link>
            <Link href={stringsMenu.hero.components.buttons[1].href}>
              <Button size="sm" variant="secondary">
                {stringsMenu.hero.components.buttons[1].text}
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden md:block w-2/3 lg:w-1/2 space-y-6 self-end pb-12">
          <span className="reveal inline-flex items-center rounded-full bg-secondary/20 px-4 py-1 text-secondary-foreground/80 ring-1 ring-accent/40">
            {stringsMenu.hero.components.tagline}
          </span>
          <h1 className="reveal text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
            <span className="block bg-gradient-to-r from-primary via-accent to-primary/60 dark:from-teal-300 dark:via-accent dark:to-teal/60 bg-clip-text text-8xl sm:text-6xl text-transparent">
              {stringsMenu.hero.components.title}
            </span>
          </h1>
          <p className="reveal max-w-xl ">
            {stringsMenu.hero.components.description}
          </p>
          <div className="reveal flex flex-wrap items-center gap-4 pt-2">
            <Link href={stringsMenu.hero.components.buttons[0].href}>
              <Button size="lg">
                {stringsMenu.hero.components.buttons[0].text}
              </Button>
            </Link>
            <Link href={stringsMenu.hero.components.buttons[1].href}>
              <Button size="lg" variant="secondary">
                {stringsMenu.hero.components.buttons[1].text}
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full h-full absolute inset-0 bg-gradient-to-t from-background via-background/40 via-30% to-transparent to-50% -z-1" />
      </div>
    </section>
  );
}
