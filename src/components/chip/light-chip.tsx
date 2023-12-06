"use client";

import React, { type PropsWithChildren } from "react";
import { type Variants, motion } from "framer-motion";

export default function LightChip({ children }: Readonly<PropsWithChildren>) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      variants={primaryVariants}
      className="w-fit overflow-clip rounded-xl bg-gray-50/20 px-4 py-0.5 text-xs font-light"
    >
      {children}
    </motion.div>
  );
}

const primaryVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};
