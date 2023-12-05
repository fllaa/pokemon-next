import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@poku/server/api/trpc";
import type { Pokemon } from "pokedex-promise-v2";

export const pokemonRouter = createTRPCRouter({
  getPokemons: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          page: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const promises: Promise<Pokemon>[] = [];
      const { limit = 10, page = 0 } = input ?? {};
      const pokemonsList = await ctx.P.getPokemonsList({
        limit,
        offset: page === 0 ? page : page * limit - limit,
      });
      pokemonsList.results.forEach((pokemon) => {
        promises.push(ctx.P.getPokemonByName(pokemon.name));
      });
      const pokemonDetails = await Promise.all(promises);
      const results = pokemonsList.results.map((pokemon, index) => ({
        ...pokemon,
        types: pokemonDetails[index]?.types,
        image: `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${pokemonDetails[index]?.id}.svg`,
      }));
      return results;
    }),
  getPokemonByName: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.P.getPokemonByName(input);
    }),
});
