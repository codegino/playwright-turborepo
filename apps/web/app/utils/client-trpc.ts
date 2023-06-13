import { httpBatchLink } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { AppRouter } from "some-trpc";
import SuperJSON from "superjson";

function getBaseUrl() {
  return `http://localhost:4000`;
}

export const clientTrpc = createTRPCNext<AppRouter>({
  config(opts) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
          async headers() {
            const token = window.localStorage.getItem("xxx-token");

            const headers: Record<string, string> = {
              "xxx-any-custom-header": "123",
            };

            // if (token) {
            // headers["Authorization"] = `Bearer ${token}`;
            headers["Authorization"] = `Bearer`;
            // }

            return headers;
          },
        }),
      ],
    };
  },
  ssr: false,
});
