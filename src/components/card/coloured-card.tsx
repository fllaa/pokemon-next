"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { type Variants, motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import type { PokemonType } from "pokedex-promise-v2";

import { useLayoutStore } from "@poku/stores/layout";
import { type ColorTypes } from "@poku/data";
import { titleCase } from "@poku/utils/string";
import Pokeball from "@poku/assets/pokeball.svg";
import DefaultTitle from "@poku/components/title/default-title";

export interface ColouredCardProps {
  data: {
    image: string;
    name: string;
    url: string;
    types: PokemonType[] | undefined;
  };
}

export default function ColouredCard({ data }: Readonly<ColouredCardProps>) {
  const router = useRouter();
  const { isGrid } = useLayoutStore(
    useShallow((state) => ({
      isGrid: state.isGrid,
    })),
  );

  const bgColors = {
    normal: "bg-[#A8A77A]",
    fighting: "bg-[#C22E28]",
    flying: "bg-[#A98FF3]",
    poison: "bg-[#A33EA1]",
    ground: "bg-[#E2BF65]",
    rock: "bg-[#B6A136]",
    bug: "bg-[#A6B91A]",
    ghost: "bg-[#735797]",
    steel: "bg-[#B7B7CE]",
    fire: "bg-[#EE8130]",
    water: "bg-[#6390F0]",
    grass: "bg-[#7AC74C]",
    electric: "bg-[#F7D02C]",
    psychic: "bg-[#F95587]",
    ice: "bg-[#96D9D6]",
    dragon: "bg-[#6F35FC]",
    dark: "bg-[#705746]",
    fairy: "bg-[#D685AD]",
    unknown: "bg-[#BDBDBD]",
    shadow: "bg-[#BDBDBD]",
  };
  return (
    <motion.button
      onClick={() => router.push(data.name)}
      variants={primaryVariants}
      className={clsx(
        "relative",
        bgColors[(data.types?.[0]?.type.name as ColorTypes) ?? "normal"],
        "text-white",
        "group cursor-pointer overflow-clip rounded-3xl px-4 py-6",
      )}
    >
      <DefaultTitle className="text-xl font-semibold">
        {titleCase(data.name)}
      </DefaultTitle>
      <div className="flex flex-col gap-2 pt-2">
        {data.types?.map(({ type }) => (
          <div
            key={type.name}
            className="w-fit overflow-clip rounded-xl bg-gray-50/20 px-4 py-0.5 text-xs font-light"
          >
            {titleCase(type.name)}
          </div>
        ))}
      </div>
      <div
        className={clsx(
          "absolute z-0 text-gray-50/20 transition-transform duration-300 group-hover:rotate-12",
          isGrid
            ? "bottom-[-24px] right-[-24px] h-32 w-32"
            : "bottom-[-72px] right-0 h-64 w-64",
        )}
      >
        <Pokeball />
      </div>
      <div
        className={clsx(
          "absolute bottom-[-18px] right-0 h-full transition-transform duration-300 group-hover:scale-110",
          isGrid ? "w-20" : "w-32",
        )}
      >
        <Image
          src={data.image}
          alt={data.name}
          className="object-contain"
          fill
        />
      </div>
    </motion.button>
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
