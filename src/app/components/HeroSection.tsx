"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { ArrowDownCircleIcon, DocumentArrowDownIcon, SparklesIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {
    const heroRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);
    const orbsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate text content
            if (textRef.current) {
                gsap.fromTo(
                    textRef.current.children,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1,
                        stagger: 0.15,
                        ease: "power3.out",
                    }
                );
            }

            // Animate image with parallax
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    {
                        opacity: 0,
                        scale: 0.8,
                        rotation: -5,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        duration: 1.2,
                        ease: "back.out(1.7)",
                        delay: 0.3,
                    }
                );

                // Parallax effect on scroll
                gsap.to(imageRef.current, {
                    y: -50,
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            }

            // Animate buttons
            if (buttonsRef.current) {
                gsap.fromTo(
                    buttonsRef.current.children,
                    {
                        opacity: 0,
                        y: 30,
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power2.out",
                        delay: 0.8,
                    }
                );
            }

            // Animate floating orbs
            orbsRef.current.forEach((orb, index) => {
                if (orb) {
                    gsap.to(orb, {
                        y: "+=30",
                        x: index % 2 === 0 ? "+=20" : "-=20",
                        rotation: 360,
                        duration: 10 + index * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.6, -0.05, 0.01, 0.99],
            },
        },
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.15),transparent_50%)]"
                    animate={{
                        backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.15),transparent_50%)]"
                    animate={{
                        backgroundPosition: ["100% 100%", "0% 0%"],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />
            </div>

            {/* Floating Orbs with GSAP */}
            <div
                ref={(el) => {
                    if (el) orbsRef.current[0] = el;
                }}
                className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 hidden md:block"
            />
            <div
                ref={(el) => {
                    if (el) orbsRef.current[1] = el;
                }}
                className="absolute top-40 right-10 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 hidden md:block"
            />
            <div
                ref={(el) => {
                    if (el) orbsRef.current[2] = el;
                }}
                className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 hidden md:block"
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                    {/* Text Content */}
                    <motion.div
                        ref={textRef}
                        variants={itemVariants}
                        className="col-span-1 lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <SparklesIcon className="w-4 h-4 text-purple-400" />
                            </motion.div>
                            <span className="text-muted-foreground">Available for new opportunities</span>
                        </motion.div>

                        <div className="space-y-4">
                            <motion.h1
                                variants={itemVariants}
                                className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight"
                            >
                                <motion.span
                                    className="block text-foreground mb-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    Hello, I&apos;m{" "}
                                </motion.span>
                                <motion.span
                                    className="block gradient-text"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                >
                                    <TypeAnimation
                                        sequence={[
                                            "Robert Karienye",
                                            2000,
                                            "A Full Stack Developer",
                                            2000,
                                            "A Web Developer",
                                            2000,
                                            "A Mobile App Developer",
                                            2000,
                                        ]}
                                        wrapper="span"
                                        speed={50}
                                        repeat={Infinity}
                                        className="block"
                                    />
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                variants={itemVariants}
                                className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto lg:mx-0"
                            >
                                I&apos;m a dedicated programmer based in Nairobi, Kenya, with a strong focus on creating
                                impactful, user-centered applications. Let&apos;s connect and turn your vision into a reality!
                            </motion.p>
                        </div>

                        <motion.div
                            ref={buttonsRef}
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white font-semibold overflow-hidden transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40"
                            >
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    initial={{ x: "-100%" }}
                                    whileHover={{ x: "0%" }}
                                    transition={{ duration: 0.3 }}
                                />
                                <span className="relative z-10 flex items-center gap-2">
                                    Hire Me
                                    <motion.div
                                        animate={{ rotate: [0, 90, 0] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <ArrowDownCircleIcon className="w-5 h-5" />
                                    </motion.div>
                                </span>
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(236, 72, 153, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-1 py-1 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 overflow-hidden transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/40"
                            >
                                <span className="relative z-10 flex items-center gap-2 bg-card rounded-full px-5 sm:px-7 py-2 sm:py-3 hover:bg-card/90 transition-colors">
                                    <span className="font-semibold text-sm sm:text-base">Download CV</span>
                                    <motion.div
                                        animate={{ y: [0, 4, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <DocumentArrowDownIcon className="w-5 h-5" />
                                    </motion.div>
                                </span>
                            </motion.button>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={itemVariants}
                            className="flex items-center gap-6 justify-center lg:justify-start pt-4"
                        >
                            <span className="text-sm text-muted-foreground">Follow me:</span>
                            <div className="flex gap-4">
                                {["GitHub", "LinkedIn", "Twitter"].map((social, index) => (
                                    <motion.a
                                        key={social}
                                        href="#"
                                        whileHover={{ scale: 1.2, y: -2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1 + index * 0.1 }}
                                        className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <span className="sr-only">{social}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        ref={imageRef}
                        variants={itemVariants}
                        className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end mt-8 lg:mt-0"
                    >
                        <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[450px] lg:h-[450px]">
                            {/* Glowing Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-500/30 blur-2xl"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            />

                            {/* Outer Ring */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 20,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />

                            {/* Image Container */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="relative w-full h-full rounded-full glass-dark overflow-hidden border-4 border-purple-500/30"
                            >
                                <Image
                                    src="/images/avatar.png"
                                    alt="Robert Karienye"
                                    fill
                                    className="object-cover rounded-full"
                                    priority
                                    sizes="(max-width: 640px) 250px, (max-width: 1024px) 300px, 450px"
                                />
                            </motion.div>

                            {/* Floating Badges */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -right-4 glass px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hidden sm:block"
                            >
                                <span className="text-purple-400">5+ Years</span>
                            </motion.div>
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute -bottom-4 -left-4 glass px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hidden sm:block"
                            >
                                <span className="text-pink-400">50+ Projects</span>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <motion.a
                    href="#about"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <span className="text-xs">Scroll down</span>
                    <ArrowDownCircleIcon className="w-5 h-5" />
                </motion.a>
            </motion.div>
        </section>
    );
};

export default HeroSection;
