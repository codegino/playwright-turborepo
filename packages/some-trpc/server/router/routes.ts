import { z } from "zod";
import {
  protectedProcedure,
  publicProcedure,
  router,
  mergeRouters,
} from "../trpc";

// Create a delay function
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const protectedRouter = router({
  locked: protectedProcedure
    .input(
      z.object({
        value: z.string(),
      })
    )
    .query(async (opts) => {
      await delay(2000);
      return {
        something: `You passed the auth check! You sent me this: "${opts.input.value}"`,
      };
    }),
});

const randomFeatureRouter = router({
  hey: publicProcedure.query(() => {
    return {
      message: "Hey!",
    };
  }),
  hello: publicProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(async (opts) => {
      return {
        greeting: `Hello ${opts.input.text}`,
      };
    }),
  flag: publicProcedure
    .input(
      z.object({
        feature: z.string(),
      })
    )
    .query((opts) => {
      const someLogicToFetchFromSomewere = opts.input.feature === "feature-a";
      return {
        isEnabled: someLogicToFetchFromSomewere,
      };
    }),
});

export const appRouter = mergeRouters(protectedRouter, randomFeatureRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
