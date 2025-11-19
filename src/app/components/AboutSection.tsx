"use client";

import React, { useTransition, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, GraduationCap, Award, Sparkles } from "lucide-react";
import TabButton from "./TabButton";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        icon: <Code2 className="w-5 h-5" />,
        content: (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                    "Next.js",
                    "React Native",
                    "JavaScript",
                    "Python",
                    "Tailwind CSS",
                    "Java",
                    "TypeScript",
                    "PostgreSQL",
                    "Docker",
                ].map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="group relative glass rounded-lg p-3 sm:p-4 hover:bg-white/10 transition-all duration-300 cursor-default"
                    >
                        <div className="flex items-center gap-2 sm:gap-3">
                            <motion.div
                                className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                                whileHover={{ scale: 1.5, rotate: 180 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            />
                            <span className="text-xs sm:text-sm font-medium">{skill}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        ),
    },
    {
        title: "Education",
        id: "education",
        icon: <GraduationCap className="w-5 h-5" />,
        content: (
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
                >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <motion.div
                            className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <GraduationCap className="w-6 h-6 text-purple-400" />
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-base sm:text-lg mb-1">Bachelor of Science</h3>
                            <p className="text-muted-foreground mb-2 text-sm sm:text-base">Information Technology</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Focused on software engineering and system design</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        ),
    },
    {
        title: "Certifications",
        id: "certifications",
        icon: <Award className="w-5 h-5" />,
        content: (
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="glass rounded-xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300"
                >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                        <motion.div
                            className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20"
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Award className="w-6 h-6 text-purple-400" />
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-base sm:text-lg mb-1">AWS Cloud Practitioner</h3>
                            <p className="text-muted-foreground mb-2 text-sm sm:text-base">Amazon Web Services</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Certified in cloud computing fundamentals</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        ),
    },
];

const AboutSection = () => {
    const [tab, setTab] = useState("skills");
    const [isPending, startTransition] = useTransition();
    const sectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleTabChange = (id: string) => {
        startTransition(() => {
            setTab(id);
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate image on scroll
            if (imageRef.current) {
                gsap.fromTo(
                    imageRef.current,
                    {
                        opacity: 0,
                        x: -100,
                        scale: 0.9,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: imageRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Animate content on scroll
            if (contentRef.current) {
                gsap.fromTo(
                    contentRef.current,
                    {
                        opacity: 0,
                        x: 100,
                    },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: contentRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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
            ref={sectionRef}
            id="about"
            className="py-16 sm:py-20 lg:py-32 relative overflow-hidden"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center"
                >
                    {/* Image */}
                    <motion.div
                        ref={imageRef}
                        variants={itemVariants}
                        className="relative aspect-square rounded-2xl overflow-hidden group order-2 lg:order-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                        <motion.div
                            className="relative w-full h-full glass-dark rounded-2xl overflow-hidden border border-white/10"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                alt="Robert Karienye - Full Stack Developer"
                                src="/images/avatar.png"
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </motion.div>
                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-xl hidden sm:block"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />
                        <motion.div
                            className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-500/20 rounded-full blur-xl hidden sm:block"
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.3, 0.5, 0.3],
                            }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 1,
                            }}
                        />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        ref={contentRef}
                        variants={itemVariants}
                        className="space-y-6 sm:space-y-8 order-1 lg:order-2"
                    >
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass text-xs sm:text-sm font-medium mb-4"
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                >
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                </motion.div>
                                <span className="text-muted-foreground">About Me</span>
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
                            >
                                Crafting Digital{" "}
                                <span className="gradient-text">Experiences</span>
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                            >
                                I am a software engineer specializing in JavaScript frameworks such as ReactJS, React Native,
                                NextJS, and NodeJS. My expertise spans both front-end and back-end development. I excel at
                                creating reusable, modular components, which enables me to develop scalable and maintainable
                                codebases.
                            </motion.p>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="text-base sm:text-lg text-muted-foreground leading-relaxed"
                            >
                                My extensive experience with these technologies enables me to deliver high-quality software
                                solutions that meet the evolving needs of businesses and users. I thrive in dynamic
                                environments and continually learn and adapt to new challenges in the software development
                                landscape.
                            </motion.p>
                        </div>

                        {/* Tabs */}
                        <div className="space-y-4 sm:space-y-6">
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {TAB_DATA.map((item) => (
                                    <TabButton
                                        key={item.id}
                                        active={tab === item.id}
                                        selectTab={() => handleTabChange(item.id)}
                                        icon={item.icon}
                                    >
                                        {item.title}
                                    </TabButton>
                                ))}
                            </div>

                            <motion.div
                                key={tab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className="min-h-[200px]"
                            >
                                {TAB_DATA.find((t) => t.id === tab)?.content}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
