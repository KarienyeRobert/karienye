"use client";

import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";

const projectsData = [
    {
        id: 1,
        title: "Next.js Urban X Tech Website",
        description:
            "A modern website for a tech company built with Next.js, featuring dynamic content and seamless user experience",
        image: "/images/img.png",
        tag: ["All", "Web"],
        gitUrl: "https://urbanxtech.vercel.app/",
        previewUrl: "https://urbanxtech.vercel.app/",
    },
    {
        id: 2,
        title: "Next.js TeleVerse Website",
        description:
            "A cutting-edge telecommunications platform built with Next.js, offering real-time communication features",
        image: "/images/img_1.png",
        tag: ["All", "Web"],
        gitUrl: "https://televerse.vercel.app/",
        previewUrl: "https://televerse.vercel.app/",
    },
    {
        id: 3,
        title: "AI Flash Cards Website",
        description:
            "A simple but efficient learning tool that allows you to generate flashcards using AI technology using Gemini API",
        image: "/images/flash.png",
        tag: ["All", "Web"],
        gitUrl: "https://flash-app-woad.vercel.app/",
        previewUrl: "https://flash-app-woad.vercel.app/",
    },
];

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");

    const handleTagChange = (newTag: string) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) => project.tag.includes(tag));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="projects" className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-muted-foreground">My Work</span>
                    </motion.div>
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Briefcase className="w-8 h-8 text-purple-400" />
                        <h2 className="text-4xl sm:text-5xl font-bold">
                            Featured <span className="gradient-text">Projects</span>
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Explore my portfolio of web and mobile applications, showcasing my expertise in modern
                        technologies and clean, efficient code.
                    </p>
                </motion.div>

                {/* Filter Tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap justify-center items-center gap-4 mb-12"
                >
                    {["All", "Web", "Mobile"].map((tagName) => (
                        <ProjectTag
                            key={tagName}
                            onClick={handleTagChange}
                            name={tagName}
                            isSelected={tag === tagName}
                        />
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-200px" }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project) => (
                        <motion.div key={project.id} variants={itemVariants}>
                            <ProjectCard
                                title={project.title}
                                description={project.description}
                                imgUrl={project.image}
                                gitUrl={project.gitUrl}
                                previewUrl={project.previewUrl}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <p className="text-muted-foreground text-lg">
                            No projects found for this category.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default ProjectsSection;

