import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "some-trpc";

function getBaseUrl() {
  // Decide which url to use depending on the environment
  return `http://localhost:4000`;
}

export const clientTrpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
          async headers() {
            const token = window.localStorage.getItem("xxx-token");

            return token ? { Authorization: `Bearer ${token}` } : {};
          },
        }),
      ],
    };
  },
  ssr: false,
});
