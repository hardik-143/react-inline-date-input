import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // build: {
  //   lib: {
  //     entry: "src/index.tsx",
  //     name: "TheInlineDateInput",
  //     fileName: (format) => `the-inline-date-input.${format}.js`,
  //     formats: ["umd", "es"],
  //   },
  //   rollupOptions: {
  //     // Make sure to externalize deps that shouldn't be bundled
  //     external: ["react", "react-dom"],
  //     output: {
  //       globals: {
  //         react: "React",
  //         "react-dom": "ReactDOM",
  //       },
  //     },
  //   },
  // },
  build: {
    outDir: "dist",
    // rollupOptions: {
    //   input: path.resolve(__dirname, "index.html"),
    // },
  },
});
