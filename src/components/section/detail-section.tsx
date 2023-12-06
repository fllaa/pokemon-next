"use client";

import React from "react";
import Image from "next/image";
import { type Variants, motion } from "framer-motion";
import { IoFemale, IoMale } from "react-icons/io5";
import type { Pokemon, PokemonSpecies } from "pokedex-promise-v2";

import LineTabs from "@poku/components/tab/line-tab";
import {
  parseHeightFromMillimeters,
  parseWeightFromHectograms,
  titleCase,
} from "@poku/utils/string";
import { parseGenderRatioToPercentage } from "@poku/utils/pokemon";

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
                "Base Stats": <div>Base Stats</div>,
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

const InfoItem = ({ title, value }: Readonly<InfoItemProps>) => {
  return (
    <>
      <h6 className="col-span-2 text-gray-600">{title}</h6>
      <span className="col-span-3 font-semibold text-gray-800">
        {typeof value === "string" ? titleCase(value) : value}
      </span>
    </>
  );
};

export interface SubSectionProps {
  data: Pokemon & {
    speciesData: PokemonSpecies;
  };
}

const AboutSection = ({ data }: Readonly<SubSectionProps>) => {
  const { male, female } = parseGenderRatioToPercentage(
    data.speciesData.gender_rate,
  );
  return (
    <div className="grid grid-cols-5 gap-3">
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
        <h3 className="mt-4 text-2xl font-bold text-black">Breeding</h3>
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
    </div>
  );
};

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
