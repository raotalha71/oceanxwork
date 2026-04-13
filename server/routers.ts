import { publicProcedure, router } from "./trpc";
import { oceanaRouter } from "./routers/oceana";
import { operatorRouter } from "./routers/operator";

export const appRouter = router({
  system: router({
    health: publicProcedure.query(() => ({
      ok: true,
      now: new Date().toISOString(),
    })),
  }),
  auth: router({
    me: publicProcedure.query(() => null),
    logout: publicProcedure.mutation(() => {
      return {
        success: true,
      } as const;
    }),
  }),

  oceana: oceanaRouter,
  operator: operatorRouter,
});

export type AppRouter = typeof appRouter;
