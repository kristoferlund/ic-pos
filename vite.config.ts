/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: "src",
  build: {
    outDir: "../dist",
  },
  define: {
    "process.env.CANISTER_ID_ICPOS_FRONTEND": JSON.stringify(
      "bd3sg-teaaa-aaaaa-qaaba-cai"
    ),
    global: "window",
  },
});
