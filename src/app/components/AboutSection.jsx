"use client"

import React, { useTransition, useState } from 'react'
import Image from "next/image"
import { motion } from "framer-motion"
import { Code2, GraduationCap, Award } from "lucide-react"

const TAB_DATA = [
    {
        title: "Skills",
        id: "skills",
        icon: <Code2 className="w-5 h-5" />,
        content: (
            <div className="grid grid-cols-2 gap-4">
                {[
                    "Node.js", "Express.js", "MongoDB", "Next.js",
                    "React Native", "JavaScript", "Python", "Tailwind CSS", "Java"
                ].map((skill, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-2 bg-secondary/50 rounded-lg p-3"
                    >
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span>{skill}</span>
                    </motion.div>
                ))}
            </div>
        )
    },
    {
        title: "Education",
        id: "education",
        icon: <GraduationCap className="w-5 h-5" />,
        content: (
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/50 rounded-lg p-4"
                >
                    <h3 className="font-semibold text-lg">Bachelor of Science</h3>
                    <p className="text-muted-foreground">Information Technology</p>
                </motion.div>
            </div>
        )
    },
    {
        title: "Certifications",
        id: "certifications",
        icon: <Award className="w-5 h-5" />,
        content: (
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-secondary/50 rounded-lg p-4 flex items-center space-x-3"
                >
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">AWS Cloud Practitioner</h3>
                        <p className="text-sm text-muted-foreground">Amazon Web Services</p>
                    </div>
                </motion.div>
            </div>
        )
    }
]

const TabButton = ({ active, selectTab, children, icon }) => {
    return (
        <button
            onClick={selectTab}
            className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 ${
                active
                    ? "bg-black/60 text-white border-b-2 border-b-green-400"
                    : "hover:bg-black/80"
            }`}
        >
            {icon}
            <span className="font-medium">{children}</span>
        </button>
    )
}

const AboutSection = () => {
    const [tab, setTab] = useState("skills")
    const [isPending, startTransition] = useTransition()

    const handleTabChange = (id) => {
        startTransition(() => {
            setTab(id)
        })
    }

    return (
        <section id="about" className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative aspect-square rounded-2xl overflow-hidden"
                    >
                        <Image
                            alt="Professional headshot"
                            src="/images/avatar.png"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-3xl font-bold mb-4">About Me</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                I am a software engineer specializing in JavaScript frameworks such as ReactJS, React Native, NextJS, and NodeJS.
                                My expertise spans both front-end and back-end development. I excel at creating reusable, modular components,
                                which enables me to develop scalable and maintainable codebases. My extensive experience with these technologies
                                enables me to deliver high-quality software solutions that meet the evolving needs of businesses and users.
                                I thrive in dynamic environments and continually learn and adapt to new challenges in the software development landscape.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-3">
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
                                {TAB_DATA.find((t) => t.id === tab).content}
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection