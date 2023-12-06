"use client";

import React from "react";
import { type Variants, motion } from "framer-motion";
import { IoFemale, IoMale } from "react-icons/io5";

import {
  parseHeightFromMillimeters,
  parseWeightFromHectograms,
} from "@poku/utils/string";
import { parseGenderRatioToPercentage } from "@poku/utils/pokemon";
import {
  type SubSectionProps,
  InfoItem,
} from "@poku/components/section/detail-section";

export default function AboutSection({ data }: Readonly<SubSectionProps>) {
  const { male, female } = parseGenderRatioToPercentage(
    data.speciesData.gender_rate,
  );
  return (
    <motion.div
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.05 }}
      className="grid grid-cols-5 gap-3"
    >
      <InfoItem title="Species" value={data.species.name} />
      <InfoItem
        title="Height"
        value={parseHeightFromMillimeters(data.height)}
      />
      <InfoItem title="Weight" value={parseWeightFromHectograms(data.weight)} />
      <InfoItem
        title="Abilities"
        value={data.abilities.map(({ ability }) => ability.name).join(", ")}
      />
      <div className="col-span-5">
        <motion.h3
          variants={primaryVariants}
          className="mt-4 text-2xl font-bold text-black"
        >
          Breeding
        </motion.h3>
      </div>
      <InfoItem
        title="Gender"
        value={
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">
                <IoMale />
              </span>
              <span>{male}%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-500">
                <IoFemale />
              </span>
              <span>{female}%</span>
            </div>
          </div>
        }
      />
      <InfoItem
        title="Egg Groups"
        value={data.speciesData.egg_groups
          .map((eggGroup) => eggGroup.name)
          .join(", ")}
      />
      <InfoItem
        title="Egg Cycle"
        value={data.types[0]?.type.name ?? "Unknown"}
      />
    </motion.div>
  );
}

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
