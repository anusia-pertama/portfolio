"use client";
import { stringsMenu } from "@/placeholders/strings";
import Image from "next/image";
import Link from "next/link";

const footerData = stringsMenu.footer ?? {
  title: "Contact",
  copyright: "© 2025 AdamnGif Studio. All rights reserved.",
  links: [
    {
      text: "adamngif.studio@gmail.com",
      href: "mailto:adamngif.studio@gmail.com",
    },
    { text: "Twitter", href: "https://twitter.com/adamngif" },
    { text: "Instagram", href: "https://instagram.com/adamngif" },
    { text: "YouTube", href: "https://youtube.com/@adamngif" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-card/60 reveal-on-view">
      <div className="container mx-auto px-6 py-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Contact section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              {footerData.title}
            </h3>
            <div className="flex flex-col gap-3">
              {footerData.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 group"
                >
                  {/* Add icons based on link type */}
                  {link.text.includes("gmail") && (
                    <span className="w-5 h-5 bg-gradient-to-r from-red-400 to-blue-500 rounded flex items-center justify-center text-white text-xs">
                      @
                    </span>
                  )}
                  {link.text === "Twitter" && (
                    <span className="w-5 h-5 bg-blue-400 rounded flex items-center justify-center text-white text-xs">
                      𝕏
                    </span>
                  )}
                  {link.text === "Instagram" && (
                    <span className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-white text-xs">
                      IG
                    </span>
                  )}
                  {link.text === "YouTube" && (
                    <span className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-xs">
                      ▶
                    </span>
                  )}
                  <span className="group-hover:underline">{link.text}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Logo/Graphic section - centered on mobile, right on desktop */}
          <div className="flex md:justify-center items-center md:col-span-2 justify-self-center md:justify-self-end">
            <div className="group relative inline-flex items-center">
              <Image
                src="/favicon.ico"
                alt="AdamnGif Studio Logo"
                width={60}
                height={60}
                className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Copyright section */}
        <div className="border-t border-border/40 pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            {footerData.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
