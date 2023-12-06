import { type Metadata } from "next";
import React from "react";
import clsx from "clsx";

import { api } from "@poku/trpc/server";
import { type ColorTypes, bgColors } from "@poku/data";

export const metadata: Metadata = {
  title: "Pokemon Next - Detail",
  description: "Pokemon Next",
};

interface Params {
  name: string;
}

export default async function DetailLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Params;
}>) {
  const data = await api.pokemon.getPokemonByName.query(params.name);
  return (
    <main
      className={clsx(
        bgColors[data.types[0]?.type.name as ColorTypes],
        "h-screen w-screen text-white",
      )}
    >
      {children}
    </main>
  );
}
