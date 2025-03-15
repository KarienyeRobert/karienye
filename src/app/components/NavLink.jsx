"use client";

import Link from "next/link";
import React from "react";

const NavLink = ({ href, title, isActive }) => {
    return (
        <Link
            href={href}
            className={`relative py-2 text-lg font-medium transition-all duration-300 ${
                isActive
                    ? "text-white"
                    : "text-[#ADB7BE] hover:text-white"
            }`}
        >
            {title}
        </Link>
    );
};

export default NavLink;