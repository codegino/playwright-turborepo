import { defineConfig } from "@playwright/test";

if (!process.env.CI) {
  require("dotenv").config({
    path: ".env.local",
  });
}

export default function setup() {
  return defineConfig({});
}
