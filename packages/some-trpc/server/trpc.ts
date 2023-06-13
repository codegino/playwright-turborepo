import { TRPCError, inferAsyncReturnType, initTRPC } from "@trpc/server";
import superjson from "superjson";

// By cookie
export const createContext = () => {
  return {
    apiKey: "123" as string | undefined,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  // to make TypeScript happy
  transformer: undefined,
});

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  if (!ctx.apiKey) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You shall not pass",
    });
  }

  return next({
    ctx: {
      apiKey: ctx.apiKey,
    },
  });
});

// Base router and procedure helpers
export const router = t.router;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const publicProcedure = t.procedure;
export const mergeRouters = t.mergeRouters;
