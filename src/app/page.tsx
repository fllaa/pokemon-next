import DefaultTitle from "@poku/components/title/default-title";
import HomeGrid from "@poku/components/grid/home-grid";

import { api } from "@poku/trpc/server";

export default async function HomePage() {
  const data = await api.pokemon.getPokemons.query({
    limit: 25,
  });
  return (
    <main className="container mt-24 flex flex-col items-stretch gap-4 md:mt-8 md:flex-row md:items-center lg:gap-8">
      <DefaultTitle className="my-8 flex-1 flex-grow-0">Pokedex</DefaultTitle>
      <HomeGrid initialData={data} />
    </main>
  );
}
