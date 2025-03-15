import { supabase } from "./BD/supabase.js";

document.addEventListener('DOMContentLoaded', async function() {

    const songList = document.querySelector('.song-list');
    const guardarBtn = document.getElementById('guardar');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = fullscreenImage.querySelector('img');
    const buscador = document.getElementById('buscador');

    // cargar las canciones desde supabase
    const {data: canciones, error} = await supabase
        .from('t_canciones')
        .select('*');
        
    if (error) {
        console.error('Error cargando canciones:', error);
        return;
    }
    
    console.log('Canciones cargadas:', canciones);



    //! Función para mostrar las canciones filtradas

    function mostrarCanciones(filtro = '') {
        songList.innerHTML = ''; // Limpiar la lista actual

        const cancionesFiltradas = canciones.filter(cancion =>
            cancion.nombre.toLowerCase().includes(filtro.toLowerCase())
        );

        // Crear y agregar las canciones al DOM
        if (cancionesFiltradas.length > 0) {
            cancionesFiltradas.forEach(cancion => {
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

                const songDetails = document.createElement('div');
                songDetails.classList.add('song-details');
                songDetails.innerHTML = `
                <p><strong>Tono:</strong> ${cancion.tono} (${cancion.Rango_voz})</p>`;
            songElement.appendChild(songDetails);

                // Agregar la canción al contenedor
                songList.appendChild(songElement);
            });
        } else {
            songList.innerHTML = '<p>No hay canciones disponibles. </p>';
        }
    }

    // Mostrar todas las canciones al cargar la página
    mostrarCanciones();

     // Escuchar el evento de entrada en el buscador
    buscador.addEventListener('input', function(event) {
       const filtro = event.target.value; // Obtener el texto ingresado
       mostrarCanciones(filtro); // Filtrar y mostrar las canciones
    });

    // Guardar las canciones seleccionadas
        guardarBtn.addEventListener('click', async function() {
            const selectedSongs = [];
            const checkboxes = document.querySelectorAll('.song input[type="checkbox"]:checked');
            console.log('Checkboxes seleccionados:', checkboxes); // Depuración

            checkboxes.forEach(checkbox => {
                console.log('Valor del checkbox:', checkbox.value); // Depuración

                // Busca la canción correspondiente en el array `canciones`
                const cancionSeleccionada = canciones.find(cancion => cancion.id === parseInt(checkbox.value));
                if (cancionSeleccionada) {
                    selectedSongs.push({
                        id: cancionSeleccionada.id,
                        nombre: cancionSeleccionada.nombre,
                        imagen: cancionSeleccionada.imagen,
                        tono: cancionSeleccionada.tono,
                        Rango_voz: cancionSeleccionada.Rango_voz
                    });
                } else {
                    console.error('Canción no encontrada para el ID:', checkbox.value); // Depuración
                }
            });

            console.log('Canciones seleccionadas:', selectedSongs); // Depuración

            // Validar que se hayan seleccionado canciones
            if (selectedSongs.length === 0) {
                alert('No seleccionaste ninguna canción.');
                return;
            }

            // Pedir al usuario el nombre de la lista y quién la dirige
            const nombreLista = prompt('Nombre de la lista:');
            const dirige = prompt('¿Quién dirige?');
            
            // Guardar en Supabase
            const { data, error } = await supabase
                .from('t_listas_domingos')
                .insert([{ 
                    canciones: selectedSongs,
                    nombre_lista: nombreLista,
                    dirige: dirige
                }]);

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