"use client";

import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links }) => {
    return (
        <div className="bg-[#121212] bg-opacity-95 backdrop-blur-sm border-t border-white/10">
            <ul className="flex flex-col items-center py-4 space-y-4">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className="w-full text-center transition-all duration-300 hover:bg-white/5"
                    >
                        <NavLink href={link.path} title={link.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuOverlay;