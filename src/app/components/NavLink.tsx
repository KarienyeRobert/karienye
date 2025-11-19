"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavLinkProps {
    href: string;
    title: string;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href, title, isActive = false, onClick }) => {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={cn(
                "relative py-2 text-base font-medium transition-all duration-300",
                isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
            )}
        >
            <motion.span
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block"
            >
                {title}
            </motion.span>
            {isActive && (
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
            )}
        </Link>
    );
};

export default NavLink;
