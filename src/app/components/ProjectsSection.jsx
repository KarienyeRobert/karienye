"use client";

import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { Briefcase } from "lucide-react";

const projectsData = [
    {
        id: 1,
        title: "Next.js Urban X Tech Website",
        description: "A modern website for a tech company built with Next.js, featuring dynamic content and seamless user experience",
        image: "/images/img.png",
        tag: ["All", "Web"],
        gitUrl: "https://urbanxtech.vercel.app/",
        previewUrl: "https://urbanxtech.vercel.app/",
    },
    {
        id: 2,
        title: "Next.js TeleVerse Website",
        description: "A cutting-edge telecommunications platform built with Next.js, offering real-time communication features",
        image: "/images/img_1.png",
        tag: ["All", "Web"],
        gitUrl: "https://televerse.vercel.app/",
        previewUrl: "https://televerse.vercel.app/",
    },
    {
        id: 3,
        title: "AI Flash Cards Website",
        description: "A simple but efficient learning tool that allows you to generate flashcards using AI technology using Gemini API",
        image: "/images/flash.png",
        tag: ["All", "Web"],
        gitUrl: "https://flash-app-woad.vercel.app/",
        previewUrl: "https://flash-app-woad.vercel.app/"
    }
];

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    );

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    return (
        <section id="projects" className="py-20 bg-background relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
            
            <div className="container mx-auto px-4 relative">
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <Briefcase className="w-8 h-8 text-primary" />
                        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                            My Projects
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Explore my portfolio of web and mobile applications, showcasing my expertise
                        in modern technologies and clean, efficient code.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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

                <motion.div
                    ref={ref}
                    variants={staggerContainer}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {filteredProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={fadeInUp}
                            className="h-full"
                        >
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