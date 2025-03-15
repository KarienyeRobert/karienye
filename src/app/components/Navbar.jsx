"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const navLinks = [
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Projects",
    path: "#projects",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = navLinks.map(link => link.path.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <nav
          className={`fixed mx-auto w-full top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out ${
              scrolled
                  ? "bg-[#121212] bg-opacity-95 backdrop-blur-sm shadow-lg"
                  : "bg-transparent"
          }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4 px-6">
            <Link
                href="/"
                className="group flex items-center gap-2 text-2xl md:text-3xl text-white font-bold transition-transform duration-300 hover:scale-105"
            >
              <Image
                  src="/images/footer.png"
                  alt="logo"
                  width={40}
                  height={40}
                  className="rounded-full transition-transform duration-300 group-hover:rotate-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <ul className="flex items-center space-x-8">
                {navLinks.map((link, index) => (
                    <li key={index} className="relative">
                      <NavLink
                          href={link.path}
                          title={link.title}
                          isActive={activeSection === link.path.substring(1)}
                      />
                      {activeSection === link.path.substring(1) && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform origin-left transition-transform duration-300" />
                      )}
                    </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setNavbarOpen(!navbarOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
            >
              {!navbarOpen ? (
                  <Bars3Icon className="h-6 w-6 text-white" />
              ) : (
                  <XMarkIcon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
              navbarOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4 pointer-events-none"
          }`}>
            <MenuOverlay links={navLinks} />
          </div>
        </div>
      </nav>
  );
};

export default Navbar;