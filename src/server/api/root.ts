import { createTRPCRouter } from "@poku/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  // TODO: Add new router here
});

// export type definition of API
export type AppRouter = typeof appRouter;
