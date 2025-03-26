import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="group rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
      <div
        className="h-52 md:h-72 relative"
        style={{
          background: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay with improved animation */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Link
                href={gitUrl}
                className="h-14 w-14 relative rounded-full border-2 border-[#ADB7BE] hover:border-white transition-colors duration-300 group/link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeBracketIcon className="h-8 w-8 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white transition-colors duration-300" />
                <span className="sr-only">View Source Code</span>
              </Link>
              <Link
                href={previewUrl}
                className="h-14 w-14 relative rounded-full border-2 border-[#ADB7BE] hover:border-white transition-colors duration-300 group/link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeIcon className="h-8 w-8 text-[#ADB7BE] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover/link:text-white transition-colors duration-300" />
                <span className="sr-only">View Live Preview</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content section with improved spacing and animations */}
      <div className="bg-[#181818] p-6 transform transition-transform duration-300">
        <h5 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h5>
        <p className="text-[#ADB7BE] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;