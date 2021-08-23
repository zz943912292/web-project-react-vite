import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
    assetsDir: 'static',
  },
  define: {
    global: 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    reactRefresh(),
    // https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: ['es.object.from-entries', 'es.array.flat'],
    }),
  ],
  esbuild: {
    target: 'es2020',
  },
  css: {
    modules: {
      // Class names will be camelized, the original class name will not to be removed from the locals
      // https://github.com/madyankin/postcss-modules
      localsConvention: 'camelCase',
    },
    postcss: {
      plugins: [
        // eslint-disable-next-line global-require
        require('autoprefixer'),
      ],
    },
  },
});
