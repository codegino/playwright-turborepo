import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "some-trpc";

// not sure what use case it may serve
export const serverTrpc = createServerSideHelpers({
  router: appRouter,
  ctx: {
    apiKey: "456",
  },
});
