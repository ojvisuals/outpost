import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { host: '127.0.0.1',
    open: true
   }, // lets you open the dev server on a phone on the same Wi-Fi
});
