"use client";

import React from "react";
import Image from "next/image";
import { type Variants, motion } from "framer-motion";
import type { Pokemon, PokemonSpecies } from "pokedex-promise-v2";

import AboutSection from "@poku/components/section/about-section";
import BaseStatsSection from "@poku/components/section/base-stats-section";
import LineTabs from "@poku/components/tab/line-tab";
import { titleCase } from "@poku/utils/string";

export interface DetailSectionProps {
  data: Pokemon & {
    speciesData: PokemonSpecies;
  };
}

export default function DetailSection({ data }: Readonly<DetailSectionProps>) {
  const imageSrc = data.sprites.other.dream_world.front_default;
  const tabs = ["About", "Base Stats", "Evolution", "Moves"];
  return (
    <motion.div
      initial="initial"
      animate="animate"
      viewport={{ once: true }}
      variants={sectionVariants}
      className="fixed bottom-0 mb-[-12rem] w-screen rounded-t-[2rem] bg-white pb-48"
    >
      <div className="mt-[-10rem] flex flex-col items-center">
        {imageSrc && (
          <div className="flex h-[216px] w-[216px] items-end">
            <Image
              src={imageSrc}
              alt={data.name}
              width={216}
              height={216}
              className="rounded-t-[2rem]"
            />
          </div>
        )}
        <div className="container py-8">
          <LineTabs tabs={tabs}>
            {({ activeTab }) => {
              const sectionTabs = {
                About: <AboutSection data={data} />,
                "Base Stats": <BaseStatsSection data={data} />,
                Evolution: <div>Evolution</div>,
                Moves: <div>Moves</div>,
              };
              return (
                <div className="mt-6 min-h-[320px]">
                  {sectionTabs[activeTab as keyof typeof sectionTabs]}
                </div>
              );
            }}
          </LineTabs>
        </div>
      </div>
    </motion.div>
  );
}

export interface InfoItemProps {
  title: string;
  value: React.ReactNode;
}

export const InfoItem = ({ title, value }: Readonly<InfoItemProps>) => {
  return (
    <>
      <motion.h6
        variants={primaryVariants}
        className="col-span-2 text-gray-600"
      >
        {title}
      </motion.h6>
      <motion.span
        variants={primaryVariants}
        className="col-span-3 font-semibold text-gray-800"
      >
        {typeof value === "string" ? titleCase(value) : value}
      </motion.span>
    </>
  );
};

export interface SubSectionProps {
  data: Pokemon & {
    speciesData: PokemonSpecies;
  };
}

// variant to animate the section in view from the bottom
const sectionVariants: Variants = {
  initial: {
    y: 700,
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      type: "spring",
      bounce: 0.3,
    },
  },
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
