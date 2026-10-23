import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['https://pappose-unprim-jaden.ngrok-free.dev'],
    host: true, // Wajib agar bisa diakses dari luar network
    port: 3001, // Pastikan port ini sesuai
    open: false // Biasanya auto-open dinonaktifkan untuk ngrok
  }
});
