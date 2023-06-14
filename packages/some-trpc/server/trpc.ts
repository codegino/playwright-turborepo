import { TRPCError, initTRPC } from "@trpc/server";

export type Context = (opts: { req: Request; res: Response }) => {
  apiKey: string | undefined;
};

const t = initTRPC.context<Context>().create();

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
