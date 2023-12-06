"use client";

import React from "react";
import { type Variants, motion } from "framer-motion";

import ProgressBar from "@poku/components/bar/progress-bar";
import {
  type SubSectionProps,
  InfoItem,
} from "@poku/components/section/detail-section";
import { titleCase } from "@poku/utils/string";

export default function BaseStatsSection({ data }: Readonly<SubSectionProps>) {
  const total = data.stats.reduce((acc, stat) => acc + stat.base_stat, 0);
  const mainStat = data.stats.find((stat) => stat.effort > 0);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
      viewport={{ once: true }}
      className="grid grid-cols-5 gap-3"
    >
      {data.stats.map((stat) => (
        <InfoItem
          key={stat.stat.name}
          title={titleCase(stat.stat.name)}
          value={<ProgressWithValue value={stat.base_stat} />}
        />
      ))}
      <InfoItem
        title="Total"
        value={
          <ProgressWithValue
            value={Math.round(total / data.stats.length)}
            originalValue={total}
          />
        }
      />
      <div className="col-span-5">
        <motion.h3
          variants={primaryVariants}
          className="mt-2 text-2xl font-bold text-black"
        >
          Type {mainStat?.stat.name}
        </motion.h3>
      </div>
      <motion.span
        variants={primaryVariants}
        className="col-span-5 mt-[-0.5rem] text-sm text-gray-500"
      >
        The effectiveness of each type on {data.name}
      </motion.span>
    </motion.div>
  );
}

export const ProgressWithValue = ({
  value,
  originalValue,
}: Readonly<{ value: number; originalValue?: number }>) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-gray-800">{originalValue ?? value}</span>
      <ProgressBar value={value} isLogarithmic />
    </div>
  );
};

const primaryVariants: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
};
