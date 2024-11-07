import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { nodePolyfills } from "vite-plugin-node-polyfills";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  server: {
    host: '0.0.0.0', // Allow access from the outside
    port: 5173      // Ensure this port is used for development
  },
});
