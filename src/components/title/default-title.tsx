"use client";

import React from "react";
import { type HTMLMotionProps, type Variants, motion } from "framer-motion";
import clsx from "clsx";

export interface DefaultTitleProps extends HTMLMotionProps<"h1"> {
  children: React.ReactNode;
}

export default function DefaultTitle({
  children,
  className,
  ...rest
}: Readonly<DefaultTitleProps>) {
  return (
    <motion.h1
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      viewport={{ once: true }}
      variants={primaryVariants}
      {...rest}
      className={clsx(className, "text-4xl font-extrabold")}
    >
      {children}
    </motion.h1>
  );
}

const primaryVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};
