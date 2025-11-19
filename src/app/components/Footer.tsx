"use client";

import React from "react";
import { Code2, Rocket, Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative border-t border-white/10 bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Left side - Made with love */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-muted-foreground"
                    >
                        <Code2 className="w-5 h-5 text-purple-400" />
                        <span className="text-sm">
                            Built with{" "}
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                                className="inline-block mx-1"
                            >
                                <Heart className="w-4 h-4 text-pink-500 inline" />
                            </motion.span>{" "}
                            by{" "}
                            <Link
                                href="https://github.com/KarienyeRobert"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-400 hover:text-purple-300 transition-colors font-semibold"
                            >
                                Karienye
                            </Link>
                        </span>
                    </motion.div>

                    {/* Right side - Copyright */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2 text-muted-foreground"
                    >
                        <Rocket className="w-5 h-5 text-purple-400" />
                        <span className="text-sm">© {currentYear} All rights reserved</span>
                    </motion.div>
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="mt-8 pt-8 border-t border-white/10 text-center"
                >
                    <p className="text-xs text-muted-foreground">
                        Crafted with Next.js, React, and Tailwind CSS
                    </p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

