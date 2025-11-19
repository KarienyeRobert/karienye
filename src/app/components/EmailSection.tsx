"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Coffee, Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const data = {
            email: formData.get("email") as string,
            subject: formData.get("subject") as string,
            message: formData.get("message") as string,
        };

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.status === 200) {
                setEmailSubmitted(true);
                e.currentTarget.reset();
                setTimeout(() => setEmailSubmitted(false), 5000);
            }
        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const socialLinks = [
        {
            name: "GitHub",
            href: "https://github.com/KarienyeRobert",
            icon: Github,
            color: "hover:bg-gray-800",
        },
        {
            name: "LinkedIn",
            href: "https://www.linkedin.com/in/robert-karienye-8a4aa1242/",
            icon: Linkedin,
            color: "hover:bg-blue-600",
        },
        {
            name: "Buy Me a Coffee",
            href: "https://www.buymeacoffee.com/karienye",
            icon: Coffee,
            color: "hover:bg-amber-600",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.1),transparent_70%)]" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start"
                >
                    {/* Left Side - Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium mb-4"
                            >
                                <Sparkles className="w-4 h-4 text-purple-400" />
                                <span className="text-muted-foreground">Get In Touch</span>
                            </motion.div>
                            <h2 className="text-4xl sm:text-5xl font-bold">
                                Let&apos;s <span className="gradient-text">Connect</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                I&apos;m currently looking for new opportunities. Whether you have a question or just want to
                                say hi, I&apos;ll try my best to get back to you!
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <p className="text-sm font-medium text-muted-foreground">Find me on:</p>
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        whileTap={{ scale: 0.9 }}
                                        className={cn(
                                            "w-12 h-12 rounded-full glass flex items-center justify-center text-foreground transition-all duration-300",
                                            social.color
                                        )}
                                    >
                                        <social.icon className="w-5 h-5" />
                                        <span className="sr-only">{social.name}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Contact Form */}
                    <motion.div variants={itemVariants} className="relative">
                        {emailSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass rounded-2xl p-8 text-center space-y-4"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                                >
                                    <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
                                </motion.div>
                                <h3 className="text-2xl font-semibold text-foreground mb-2">Thank you!</h3>
                                <p className="text-muted-foreground">
                                    Your message has been sent successfully. I&apos;ll get back to you soon!
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6 glass rounded-2xl p-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground"
                                        placeholder="What's on your mind?"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-foreground placeholder:text-muted-foreground resize-none"
                                        placeholder="Let's discuss your project..."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                                            />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </motion.button>
                            </motion.form>
                        )}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default EmailSection;

