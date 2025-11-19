"use client";

import React, { useRef, useEffect } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ProjectCardProps {
    imgUrl: string;
    title: string;
    description: string;
    gitUrl: string;
    previewUrl: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    imgUrl,
    title,
    description,
    gitUrl,
    previewUrl,
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useMotionValue(0));
    const rotateY = useSpring(useMotionValue(0));

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: cardRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateXValue = (mouseY / rect.height) * 10;
        const rotateYValue = (mouseX / rect.width) * 10;

        rotateX.set(rotateXValue);
        rotateY.set(rotateYValue);
        x.set(mouseX * 0.1);
        y.set(mouseY * 0.1);
    };

    const handleMouseLeave = () => {
        rotateX.set(0);
        rotateY.set(0);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="group relative rounded-2xl overflow-hidden glass-dark border border-white/10 hover:border-purple-500/30 transition-all duration-300 perspective-1000"
        >
            <div className="relative h-64 overflow-hidden">
                <motion.div
                    style={{ x, y }}
                    className="absolute inset-0"
                >
                    <Image
                        src={imgUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </motion.div>

                {/* Gradient Overlay */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Hover Overlay with Buttons */}
                <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        className="flex gap-4"
                    >
                        <motion.a
                            href={gitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="h-14 w-14 rounded-full glass border-2 border-white/20 hover:border-purple-400 flex items-center justify-center transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-md"
                        >
                            <CodeBracketIcon className="h-6 w-6 text-white" />
                            <span className="sr-only">View Source Code</span>
                        </motion.a>
                        <motion.a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            className="h-14 w-14 rounded-full glass border-2 border-white/20 hover:border-pink-400 flex items-center justify-center transition-all duration-300 hover:bg-pink-500/20 backdrop-blur-md"
                        >
                            <EyeIcon className="h-6 w-6 text-white" />
                            <span className="sr-only">View Live Preview</span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>

            {/* Content Section */}
            <motion.div
                className="p-4 sm:p-6 space-y-3"
                initial={{ y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h5
                    className="text-lg sm:text-xl font-semibold text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                >
                    {title}
                </motion.h5>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {description}
                </p>
            </motion.div>

            {/* Shine Effect */}
            <motion.div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
            />
        </motion.div>
    );
};

export default ProjectCard;
