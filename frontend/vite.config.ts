import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-framework': [
            'react',
            'react-dom',
            'react-router-dom',
            'react-redux',
            '@reduxjs/toolkit',
            'framer-motion',
            '@emotion/react',
            '@emotion/styled',
          ],
          'mui-core': ['@mui/material'],
          'flow-core': ['@xyflow/react'],
          'mui-icons': ['@mui/icons-material'],
        },
      },
    },
  },
});
