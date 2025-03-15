"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Coffee, Mail, Send } from "lucide-react";

const EmailSection = () => {
    const [emailSubmitted, setEmailSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = {
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
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
                e.target.reset();
            }
        } catch (error) {
            console.error("Error sending email:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-16 bg-background relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        <div className="bg-secondary/30 p-8 rounded-2xl backdrop-blur-sm">
                            <h2 className="text-3xl font-bold mb-4">Let&apos;s Connect</h2>
                            <p className="text-muted-foreground mb-6">
                                I&apos;m currently looking for new opportunities. Whether you have a question
                                or just want to say hi, I&apos;ll try my best to get back to you!
                            </p>
                            <div className="flex gap-4">
                                <Link
                                    href="https://github.com/KarienyeRobert"
                                    target="_blank"
                                    className="bg-black/50 p-4 rounded-full hover:bg-black/80 transition-colors"
                                >
                                    <Github className="w-6 h-6" />
                                </Link>
                                <Link
                                    href="https://www.linkedin.com/in/robert-karienye-8a4aa1242/"
                                    target="_blank"
                                    className="bg-blue-700 p-4 rounded-full hover:bg-blue-900 transition-colors"
                                >
                                    <Linkedin className="w-6 h-6" />
                                </Link>
                                <Link
                                    href="https://www.buymeacoffee.com/karienye"
                                    target="_blank"
                                    className="bg-purple-500 p-4 rounded-full hover:bg-purple-800 transition-colors"
                                >
                                    <Coffee className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10"
                    >
                        {emailSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-primary/10 p-8 rounded-2xl text-center"
                            >
                                <Mail className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                <h3 className="text-xl text-yellow-600 font-semibold mb-2">Thank you!</h3>
                                <p className="text-muted-foreground">
                                    Your message has been sent successfully. I&apos;ll get back to you soon!
                                </p>
                            </motion.div>
                        ) : (
                            <motion.form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Your Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-border focus:border-white focus:ring-1 focus:ring-gray-600 transition-colors"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-border focus:border-white focus:ring-1 focus:ring-gray-600 transition-colors"
                                        placeholder="What's on your mind?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-border focus:border-white focus:ring-1 focus:ring-gray-600 transition-colors"
                                        placeholder="Let's discuss your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-green-500/40 text-white py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
                                >
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </motion.form>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-radial from-blue-500/20 via-gray-100 to-gray-100"/>
        </section>
    );
};

export default EmailSection;