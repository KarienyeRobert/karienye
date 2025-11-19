"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TabButtonProps {
    active: boolean;
    selectTab: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
}

const TabButton: React.FC<TabButtonProps> = ({ active, selectTab, children, icon }) => {
    return (
        <motion.button
            onClick={selectTab}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 font-medium relative overflow-hidden",
                active
                    ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-foreground border border-purple-500/30"
                    : "glass text-muted-foreground hover:text-foreground hover:bg-white/5"
            )}
        >
            {icon && <span className={cn("transition-colors", active ? "text-purple-400" : "text-muted-foreground")}>{icon}</span>}
            <span>{children}</span>
            {active && (
                <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={false}
                    transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                    }}
                />
            )}
        </motion.button>
    );
};

export default TabButton;

