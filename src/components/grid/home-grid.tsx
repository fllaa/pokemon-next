"use client";

import React from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import type { PokemonType } from "pokedex-promise-v2";

import { useLayoutStore } from "@poku/stores/layout";
import ColouredCard from "@poku/components/card/coloured-card";
import clsx from "clsx";

export interface HomeGridProps {
  initialData: {
    types: PokemonType[] | undefined;
    image: string;
    name: string;
    url: string;
  }[];
}

export default function HomeGrid({ initialData }: Readonly<HomeGridProps>) {
  const { isGrid } = useLayoutStore(
    useShallow((state) => ({
      isGrid: state.isGrid,
    })),
  );
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      className={clsx(
        "mb-8 grid flex-1 auto-rows-fr gap-4",
        isGrid ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
      )}
    >
      {initialData.map((pokemon) => (
        <ColouredCard key={pokemon.name} data={pokemon} />
      ))}
    </motion.div>
  );
}
