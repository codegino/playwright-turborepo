import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "some-trpc/server/router/routes";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: (opts) => {
      const apiKey = opts.req.headers.authorization;

      return {
        apiKey,
      };
    },
  })
);

app.listen(4000, () => {
  console.log("listening on 4000!!!");
});
