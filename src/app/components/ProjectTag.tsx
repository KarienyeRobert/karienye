"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectTagProps {
    name: string;
    onClick: (name: string) => void;
    isSelected: boolean;
}

const ProjectTag: React.FC<ProjectTagProps> = ({ name, onClick, isSelected }) => {
    const variants = {
        initial: {
            opacity: 0,
            y: 10,
        },
        animate: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
            },
        },
        hover: {
            scale: 1.05,
            transition: {
                duration: 0.2,
                ease: "easeInOut",
            },
        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1,
                ease: "easeInOut",
            },
        },
    };

    return (
        <motion.button
            variants={variants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            onClick={() => onClick(name)}
            className={cn(
                "relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-background",
                isSelected
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/10"
            )}
            aria-pressed={isSelected}
            role="tab"
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {name}
                {isSelected && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="inline-block w-1.5 h-1.5 rounded-full bg-white"
                    />
                )}
            </span>
        </motion.button>
    );
};

export default ProjectTag;

