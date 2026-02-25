import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@mui/icons-material')) {
              return 'mui-icons';
            }
            if (id.includes('@xyflow') || id.includes('reactflow')) {
              return 'flow-core';
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router') ||
              id.includes('framer-motion') ||
              id.includes('@emotion')
            ) {
              return 'react-framework';
            }
            if (id.includes('@mui/material') || id.includes('@mui/system')) {
              return 'mui-core';
            }
            return 'vendor';
          }
        },
      },
    },
  },
});
