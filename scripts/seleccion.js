import { supabase } from "../BD/supabase.js";

document.addEventListener('DOMContentLoaded', async function() {
    const listaSeleccionadas = document.getElementById('lista-seleccionadas');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = fullscreenImage.querySelector('img');
    const tituloLista = document.getElementById('titulo-list');

    // Obtener la lista de canciones seleccionadas desde Supabase
    const { data: listas, error } = await supabase
        .from('t_listas_domingos')
        .select('*')
        .order('created_at');

    if (error) {
        console.error('Error cargando listas:', error);
        return;
    }

    console.log('Listas cargadas:', listas); // Depuración

    // Obtener todas las canciones desde Supabase
    const { data: canciones, error: errorCanciones } = await supabase
        .from('t_canciones')
        .select('*');

    if (errorCanciones) {
        console.error('Error cargando canciones:', errorCanciones);
        return;
    }

    console.log('Canciones cargadas:', canciones); // Depuración

    // Mostrar las canciones seleccionadas
    if (listas.length > 0) {
        const ultimaLista = listas[listas.length - 1]; // Ultima lista guardada!
        console.log('Última lista:', ultimaLista); // Depuración
        
        // Dirige
        if (tituloLista) {
            tituloLista.textContent = `Dirige: ${ultimaLista.dirige} 🎤`;
        }
        
        // Mostrar las canciones de la lista
        ultimaLista.canciones.forEach(cancion => {
            // const cancion = canciones.find(c => c.id === cancionId);
            if (cancion && cancion.nombre) {
                const songElement = document.createElement('div');
                songElement.classList.add('song');
                songElement.textContent = cancion.nombre;

                // Agrego evento para mostrar la imagen correspondiente
                songElement.addEventListener('click', function() {
                    fullscreenImg.src = cancion.imagen;
                    fullscreenImage.style.display = 'flex';
                });
                listaSeleccionadas.appendChild(songElement);
            } else {
                console.error('Canción no valida:', cancion); // Depuración
            }
        });
    } else {
        listaSeleccionadas.innerHTML = '<p>No hay canciones seleccionadas.</p>';
    }

    // Ocultar la imagen al hacer click fuera de pantalla
    fullscreenImage.addEventListener('click', function(event) {
        if (event.target === fullscreenImage) {
            this.style.display = 'none';
            fullscreenImg.classList.remove('zoomed');
        }
    });

    // Alternar zoom al hacer clic en la imagen
    fullscreenImg.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el clic se propague al contenedor
        this.classList.toggle('zoomed'); // Alterna la clase 'zoomed'

        // Centrar la imagen al hacer zoom
        if (this.classList.contains('zoomed')) {
            this.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'center'
            });
        }
    });
});