import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    base: "./",
    test: {
      include: ["./src/*.ts"],
    },
  };
});
