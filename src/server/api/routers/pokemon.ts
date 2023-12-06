import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@poku/server/api/trpc";
import type { Pokemon } from "pokedex-promise-v2";

export const pokemonRouter = createTRPCRouter({
  getPokemons: publicProcedure
    .input(
      z
        .object({
          limit: z.number().optional(),
          cursor: z.number().optional(),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const promises: Promise<Pokemon>[] = [];
      const { limit = 10, cursor = 0 } = input ?? {};
      const pokemonsList = await ctx.P.getPokemonsList({
        limit,
        offset: cursor === 0 ? cursor : cursor * limit - limit,
      });
      pokemonsList.results.forEach((pokemon) => {
        promises.push(ctx.P.getPokemonByName(pokemon.name));
      });
      const pokemonDetails = await Promise.all(promises);
      const results = pokemonsList.results.map((pokemon, index) => ({
        ...pokemon,
        types: pokemonDetails[index]?.types,
        image: pokemonDetails[index]!.sprites.other.dream_world.front_default!,
      }));
      return {
        results,
        nextPage: cursor + 1,
      };
    }),
  getPokemonByName: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const pokemonDetail = await ctx.P.getPokemonByName(input);
      const pokemonSpecies = await ctx.P.getPokemonSpeciesByName(input);
      const data = {
        ...pokemonDetail,
        speciesData: pokemonSpecies,
      };
      return data;
    }),
});
