"use client";

import React from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { getBaseLog } from "@poku/utils/number";

export interface ProgressBarProps {
  value: number;
  isLogarithmic?: boolean;
}

export default function ProgressBar({
  value,
  isLogarithmic,
}: Readonly<ProgressBarProps>) {
  const bgColor = (() => {
    switch (true) {
      case value > 0 && value <= 25:
        return "bg-red-500";
      case value > 25 && value <= 40:
        return "bg-orange-500";
      case value > 40 && value <= 60:
        return "bg-yellow-500";
      case value > 60 && value <= 75:
        return "bg-lime-500";
      case value > 75 && value <= 90:
        return "bg-green-500";
      case value > 90 && value <= 100:
        return "bg-emerald-500";
      default:
        return "bg-gray-500";
    }
  })();
  if (isLogarithmic) {
    value = Math.round(getBaseLog(100, value) * 100);
  }
  return (
    <motion.div
      className="h-1 w-full overflow-hidden rounded-full bg-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={clsx("h-full rounded-full", bgColor)}
      />
    </motion.div>
  );
}
