import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Served from https://spursingham.github.io/Boardgame_Instructions/
  base: '/Boardgame_Instructions/',
  plugins: [react()],
});
