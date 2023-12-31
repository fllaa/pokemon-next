import { unstable_cache } from "next/cache";

import DefaultTitle from "@poku/components/title/default-title";
import HomeGrid from "@poku/components/grid/home-grid";

import { api } from "@poku/trpc/server";

export default async function HomePage() {
  const data = await unstable_cache(
    async () =>
      api.pokemon.getPokemons.query({
        limit: 25,
      }),
    ["pokemons"],
  )();
  return (
    <main className="container mt-24 gap-4 lg:gap-8">
      <DefaultTitle className="my-8 flex-1 flex-grow-0">Pokedex</DefaultTitle>
      <HomeGrid initialData={data} />
    </main>
  );
}
