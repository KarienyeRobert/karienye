"use client";

import { motion } from "framer-motion";

const ProjectTag = ({ name, onClick, isSelected }) => {
  const variants = {
    initial: { 
      opacity: 0,
      y: 10
    },
    animate: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.button
      variants={variants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={() => onClick(name)}
      className={`
        relative px-6 py-2.5 rounded-full 
        text-sm font-medium tracking-wide
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed
        ${isSelected
          ? "bg-primary text-white shadow-lg shadow-primary/25"
          : "bg-secondary/80 text-secondary-foreground hover:bg-secondary"
        }
        before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-r 
        before:from-primary/0 before:to-primary/0 before:opacity-0 
        before:transition-opacity hover:before:opacity-100
      `}
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