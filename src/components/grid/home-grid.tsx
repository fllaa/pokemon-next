"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { useShallow } from "zustand/react/shallow";
import clsx from "clsx";
import type { PokemonType } from "pokedex-promise-v2";

import { api } from "@poku/trpc/react";
import { useLayoutStore } from "@poku/stores/layout";
import ColouredCard from "@poku/components/card/coloured-card";

export interface HomeGridProps {
  initialData: {
    results: {
      types: PokemonType[] | undefined;
      image: string;
      name: string;
      url: string;
    }[];
    nextPage: number;
  };
}

export default function HomeGrid({ initialData }: Readonly<HomeGridProps>) {
  const { isGrid } = useLayoutStore(
    useShallow((state) => ({
      isGrid: state.isGrid,
    })),
  );
  const { data, fetchNextPage } = api.pokemon.getPokemons.useInfiniteQuery(
    {
      limit: 25,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
      initialData: {
        pages: [initialData],
        pageParams: [null],
      },
    },
  );
  const pokemons = useMemo(() => {
    return data?.pages?.flatMap((page) => page.results) ?? [];
  }, [data]);
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileInView="animate"
      transition={{
        staggerChildren: 0.05,
      }}
      className={clsx(
        "mb-8 grid flex-1 auto-rows-fr gap-4",
        isGrid ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1",
      )}
    >
      {pokemons.map((pokemon) => (
        <ColouredCard key={pokemon.name} data={pokemon} />
      ))}
      <motion.div onViewportEnter={() => fetchNextPage()} />
    </motion.div>
  );
}
