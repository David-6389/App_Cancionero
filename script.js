import { supabase } from "./BD/supabase.js";

// script.js
document.addEventListener('DOMContentLoaded', async function() {
    const songList = document.querySelector('.song-list');
    const guardarBtn = document.getElementById('guardar');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = fullscreenImage.querySelector('img');

    // cargar las canciones desde supabase

    const {data: canciones, error} = await supabase
        .from('t_canciones')
        .select('*');
        
    console.log('Canciones cargadas:', canciones);

    if (error) {
        console.error('Error cargando canciones:', error);
        return;
    }

    // Crear y agregar las canciones al DOM
    if (canciones.length > 0) {
        canciones.forEach(cancion => {
            const songElement = document.createElement('div');
            songElement.classList.add('song');

            // Checkbox para seleccionar la canción
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = cancion.id;
            checkbox.addEventListener('click', function(event) {
                event.stopPropagation(); // Evita que el evento se propague al contenedor
            });
            songElement.appendChild(checkbox);

            // Nombre de la canción
            const songName = document.createElement('span');
            songName.textContent = cancion.nombre;
            songName.addEventListener('click', function() {
                fullscreenImg.src = cancion.imagen;
                fullscreenImage.style.display = 'flex';
            });
            songElement.appendChild(songName);

            // Agregar la canción al contenedor
            songList.appendChild(songElement);
        });
    } else {
        songList.innerHTML = '<p>No hay canciones disponibles. </p>';
    }

    // Guardar las canciones seleccionadas
    guardarBtn.addEventListener('click', async function() {
        const selectedSongs = [];
        document.querySelectorAll('.song input[type="checkbox"]:checked').forEach(checkbox => {
            selectedSongs.push(checkbox.value); // Agrega el nombre de la canción seleccionada
        });

        // Guardar en Supabase
        const { data, error } = await supabase
            .from('t_listas_domingos')
            .insert([{ t_canciones: selectedSongs }]);

        if (error) {
            console.error('Error guardando la lista:', error);
            alert('Error al guardar la lista.');
        } else {
            alert('Lista guardada correctamente.');
        }
    });

    // Ocultar la imagen al hacer clic fuera de ella
    fullscreenImage.addEventListener('click', function(event) {
        if (event.target === fullscreenImage) {
            this.style.display = 'none';
            fullscreenImg.classList.remove('zoomed'); // Quita el zoom al cerrar
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