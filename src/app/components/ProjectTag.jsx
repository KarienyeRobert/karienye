"use client";

import { motion } from "framer-motion";

const ProjectTag = ({ name, onClick, isSelected }) => {
  return (
      <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onClick(name)}
          className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isSelected
                  ? "bg-black/60 text-gray-50"
                  : "bg-gray-900 text-white hover:bg-black/80"
          }`}
      >
        {name}
      </motion.button>
  );
};

export default ProjectTag;