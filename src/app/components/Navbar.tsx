"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

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
    const navRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Update active section based on scroll position
            const sections = navLinks.map((link) => link.path.substring(1));
            const currentSection = sections.find((section) => {
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

    useEffect(() => {
        if (navRef.current) {
            gsap.fromTo(
                navRef.current,
                { y: -100, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
            );
        }

        if (logoRef.current) {
            gsap.fromTo(
                logoRef.current,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)", delay: 0.2 }
            );
        }
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
        e.preventDefault();
        const targetId = path.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
        setNavbarOpen(false);
    };

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed mx-auto w-full top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
                scrolled
                    ? "glass-dark shadow-lg shadow-purple-500/10"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto">
                <div className="flex items-center justify-between py-4 px-4 sm:px-6">
                    <Link
                        ref={logoRef}
                        href="/"
                        className="group flex items-center gap-3 text-2xl md:text-3xl font-bold transition-transform duration-300"
                    >
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            transition={{ duration: 0.6, type: "spring" }}
                        >
                            <Image
                                src="/images/footer.png"
                                alt="logo"
                                width={45}
                                height={45}
                                className="rounded-full transition-transform duration-300"
                            />
                        </motion.div>
                        <motion.span
                            className="gradient-text hidden sm:block"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            RK
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-6 lg:space-x-8">
                            {navLinks.map((link, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    className="relative"
                                >
                                    <NavLink
                                        href={link.path}
                                        title={link.title}
                                        isActive={activeSection === link.path.substring(1)}
                                        onClick={(e) => handleSmoothScroll(e, link.path)}
                                    />
                                    {activeSection === link.path.substring(1) && (
                                        <motion.span
                                            layoutId="activeSection"
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                                            initial={false}
                                            transition={{
                                                type: "spring",
                                                stiffness: 380,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setNavbarOpen(!navbarOpen)}
                        className="md:hidden p-2 rounded-lg glass hover:bg-white/10 transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        <AnimatePresence mode="wait">
                            {!navbarOpen ? (
                                <motion.div
                                    key="menu"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <Bars3Icon className="h-6 w-6 text-foreground" />
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="close"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <XMarkIcon className="h-6 w-6 text-foreground" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {navbarOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <MenuOverlay
                                links={navLinks}
                                onLinkClick={(e, path) => {
                                    handleSmoothScroll(e, path);
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
