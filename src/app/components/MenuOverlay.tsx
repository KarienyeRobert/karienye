"use client";

import React from "react";
import NavLink from "./NavLink";
import { motion } from "framer-motion";

interface MenuOverlayProps {
    links: Array<{ title: string; path: string }>;
    onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const MenuOverlay: React.FC<MenuOverlayProps> = ({ links, onLinkClick }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-dark border-t border-white/10"
        >
            <ul className="flex flex-col items-center py-4 space-y-4">
                {links.map((link, index) => (
                    <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="w-full text-center transition-all duration-300 hover:bg-white/5 rounded-lg"
                    >
                        <NavLink
                            href={link.path}
                            title={link.title}
                            onClick={(e) => onLinkClick?.(e, link.path)}
                        />
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
};

export default MenuOverlay;
