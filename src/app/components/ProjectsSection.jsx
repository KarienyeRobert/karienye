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
    }
];

const ProjectsSection = () => {
    const [tag, setTag] = useState("All");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    const handleTagChange = (newTag) => {
        setTag(newTag);
    };

    const filteredProjects = projectsData.filter((project) =>
        project.tag.includes(tag)
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <section id="projects" className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Briefcase className="w-6 h-6 text-primary" />
                        <h2 className="text-3xl font-bold">My Projects</h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Explore my portfolio of web and mobile applications, showcasing my expertise
                        in modern technologies and clean, efficient code.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
                    <ProjectTag
                        onClick={handleTagChange}
                        name="All"
                        isSelected={tag === "All"}
                    />
                    <ProjectTag
                        onClick={handleTagChange}
                        name="Web"
                        isSelected={tag === "Web"}
                    />
                    <ProjectTag
                        onClick={handleTagChange}
                        name="Mobile"
                        isSelected={tag === "Mobile"}
                    />
                </div>

                <motion.div
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            variants={cardVariants}
                            transition={{
                                duration: 0.5,
                                ease: "easeOut",
                            }}
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
            </div>
        </section>
    );
};

export default ProjectsSection;