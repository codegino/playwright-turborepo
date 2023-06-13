import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { appRouter } from "some-trpc/server/router/routes";
import { createContext } from "some-trpc/server/trpc";
import cors from "cors";

const app = express();

app.use(cors());

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(4000, () => {
  console.log("listening on 4000!!!");
});
