import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: './', // Configura la ruta base para los archivos estáticos
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'pages/index.html'), // Página principal
                registro: path.resolve(__dirname, 'pages/registro.html'), // Página de registro
                selection: path.resolve(__dirname, 'pages/seleccion.html'), // Página de selección
            },
        },
    },
});




// import { defineConfig } from 'vite';

// export default defineConfig({
//     base: './', // Configura la ruta base para los archivos estáticos
// });