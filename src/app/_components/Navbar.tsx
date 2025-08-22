"use client";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import Image from "next/image";
import { stringsMenu } from "@/placeholders/strings";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const logo = stringsMenu.navbar.logo;

  return (
    <nav
      className="fixed inset-x-0 top-0 z-50 border-b border-border/60 
                    bg-background/60 backdrop-blur-md 
                    transition-colors duration-700"
    >
      <div className="w-full flex h-14 items-center justify-between px-6 md:px-9">
        {/* Logo */}
        <Link
          href={logo.href}
          className="font-semibold tracking-tight text-foreground hover:opacity-80"
        >
          {logo.img ? (
            <>
              <Image
                src={logo.img}
                alt="Logo"
                width={59}
                height={59}
                className="hidden md:block transition-transform group-hover:-translate-y-1"
              />
              <Image
                src={logo.img}
                alt="Logo"
                width={40}
                height={40}
                className="block md:hidden transition-transform group-hover:-translate-y-1"
              />
            </>
          ) : (
            <span className="text-lg">{logo.teks}</span> // fallback text
          )}
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          {stringsMenu.navbar.links
            .filter((link) => link.text !== "Home") // ❌ remove Home
            .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-md 
                           transition-colors duration-300
                           hover:bg-accent hover:text-accent-foreground"
              >
                {link.text}
              </Link>
            ))}
          <ThemeToggle />
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden inline-flex items-center justify-center 
                     rounded-md border border-border/60 px-2.5 py-2 text-sm 
                     transition-colors duration-300
                     hover:bg-accent hover:text-accent-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open menu"
        >
          Menu
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          className="md:hidden border-t border-border/60 
                        bg-background/90 backdrop-blur-md 
                        transition-colors duration-700"
        >
          <div className="container mx-auto px-4 py-3 grid gap-2 text-sm">
            {stringsMenu.navbar.links
              .filter((link) => link.text !== "Home")
              .map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)} // closes after click
                  className="px-3 py-2 rounded-md 
                             transition-colors duration-300
                             hover:bg-accent hover:text-accent-foreground"
                >
                  {link.text}
                </Link>
              ))}
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
