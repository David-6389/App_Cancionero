import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: './', // Configura la ruta base para los archivos estáticos
    build: {
        rollupOptions: {
            input: {
                home: path.resolve(__dirname, 'pages/canciones.html'), // Página principal
                index: path.resolve(__dirname, 'pages/index.html'), // Lista de canciones
                registro: path.resolve(__dirname, 'pages/registro.html'), // Registro
                seleccion: path.resolve(__dirname, 'pages/seleccion.html'), // Selección
            },
        },
    },
});


// import { defineConfig } from 'vite';

// export default defineConfig({
//     base: './', // Configura la ruta base para los archivos estáticos
// });