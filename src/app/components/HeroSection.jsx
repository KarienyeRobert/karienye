"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { ArrowDownCircleIcon, DocumentArrowDownIcon } from "@heroicons/react/24/solid";

const HeroSection = () => {
    return (
        <section className="relative py-12 px-4 md:py-16 lg:min-h-screen flex items-center">
            {/* Background gradient */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[#121212] bg-opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20" />
            </div>

            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="col-span-7 place-self-center text-center sm:text-left space-y-6"
                    >
                        <div className="relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-1 bg-gradient-to-r from-purple-400 to-pink-600 mb-6 hidden sm:block"
                            />
                            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                  Hello, I&apos;m{" "}
                </span>
                                <br className="hidden sm:block" />
                                <TypeAnimation
                                    sequence={[
                                        "Robert",
                                        1000,
                                        "A full stack developer",
                                        1000,
                                        "A web developer",
                                        1000,
                                        "A mobile-app developer",
                                        1000,
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    repeat={Infinity}
                                    className="text-white"
                                />
                            </h1>
                        </div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className="text-[#ADB7BE] text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed"
                        >
                            I&apos;m a dedicated programmer based in Nairobi, Kenya, with a strong focus on creating impactful, user-centered applications. Let&apos;s connect and turn your vision into a reality!
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start"
                        >
                            <button className="group px-6 py-3 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2">
                  Hire Me
                  <ArrowDownCircleIcon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </span>
                            </button>

                            <button className="group px-1 py-1 rounded-full bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 hover:shadow-lg hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center gap-2 bg-[#121212] rounded-full px-5 py-2 hover:bg-opacity-90">
                  <span className="text-white font-semibold">Download CV</span>
                  <DocumentArrowDownIcon className="w-5 h-5 text-white group-hover:translate-y-1 transition-transform duration-300" />
                </span>
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="col-span-5 place-self-center mt-4 lg:mt-0"
                    >
                        <div className="relative">
                            <div className="w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] relative">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 blur-2xl opacity-30 animate-pulse" />
                                <div className="relative rounded-full bg-[#181818] w-full h-full border-2 border-purple-500/20 backdrop-blur-sm overflow-hidden">
                                    <Image
                                        src="/images/avatar.png"
                                        alt="Hero Image"
                                        width={400}
                                        height={400}
                                        className="rounded-full absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 hover:scale-110 transition-transform duration-300"
                                        priority
                                    />
                                </div>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute -z-10 top-0 left-0 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                            <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;