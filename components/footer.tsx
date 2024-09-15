"use client";
import React from "react";
import { Link } from "@nextui-org/link";
import { siteConfig } from "@/config/site";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full py-8 bg-black">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          <div>
            <h3 className="font-semibold mb-2 text-gray-300">Credits</h3>
            <p className="text-gray-400">©GitHub Campus Club PSGTECH</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-300">Menu</h3>
            <ul className="space-y-1">
              {siteConfig.navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    className={`
                      text-gray-400 hover:text-white
                      transition-colors duration-200
                      ${pathname === item.href ? "font-bold" : ""}
                    `}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-300">Contact</h3>
            <a
              href="mailto:githubcampusclubpsgct@gmail.com"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              githubcampusclubpsgct@gmail.com
            </a>
            <p className="text-gray-400">+91 9384870740</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-gray-300">Socials</h3>
            <ul className="space-y-1">
              {Object.entries(siteConfig.links).map(([key, value]) => (
                <li key={key}>
                  <Link
                    className="
                      text-gray-400 hover:text-white
                      transition-colors duration-200
                    "
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-gray-400">©2024</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
