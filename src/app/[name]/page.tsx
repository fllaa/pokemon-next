import React from "react";

import { api } from "@poku/trpc/server";
import DefaultTitle from "@poku/components/title/default-title";
import { pad, titleCase } from "@poku/utils/string";
import LightChip from "@poku/components/chip/light-chip";
import Pokeball from "@poku/assets/pokeball.svg";
import DetailSection from "@poku/components/section/detail-section";

interface Params {
  name: string;
}

export default async function DetailPage({
  params,
}: Readonly<{ params: Params }>) {
  const data = await api.pokemon.getPokemonByName.query(params.name);
  return (
    <>
      <section className={"container relative overflow-x-hidden pb-96 pt-24"}>
        <div className="mt-8 flex items-center justify-between">
          <div className="space-y-2">
            <DefaultTitle className="flex-1 flex-grow-0">
              {titleCase(data.name)}
            </DefaultTitle>
            <div className="flex items-center gap-2">
              {data.types.map(({ type }) => (
                <LightChip key={type.name}>{titleCase(type.name)}</LightChip>
              ))}
            </div>
          </div>
          <DefaultTitle className="text-lg font-semibold">
            #{pad(data.id, 3)}
          </DefaultTitle>
        </div>
        <span className="absolute left-[-8rem] top-[-8rem] z-0 h-64 w-64 rotate-[-18deg] rounded-3xl bg-gradient-to-tl from-gray-100/20 to-transparent" />
        <span
          className={
            "absolute right-24 top-1/2 h-[20rem] w-[20rem] translate-x-[50%] translate-y-[-50%] text-gray-100/20"
          }
        >
          <Pokeball />
        </span>
      </section>
      <DetailSection data={data} />
    </>
  );
}
