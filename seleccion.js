document.addEventListener('DOMContentLoaded', function() {
    const listaSeleccionadas = document.getElementById('lista-seleccionadas');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = fullscreenImage.querySelector('img');

    // Obtener las canciones seleccionadas del localStorage
    const selectedSongs = JSON.parse(localStorage.getItem('selectedSongs')) || [];

    // Obtener todas las canciones del localStorage
    const songs = JSON.parse(localStorage.getItem('allSongs')) || [];

    // Mostrar las canciones seleccionadas
    if (selectedSongs.length > 0) {
        selectedSongs.forEach(songName => {
            const songElement = document.createElement('div');
            songElement.classList.add('song');
            songElement.textContent = songName;

            // Agrego evento para mostrar la imagen correspondiente
            songElement.addEventListener('click', function() {
                //Aca busca la imagen de la cancion 
                const song = songs.find(s => s.name === songName);
                if (song) {
                    fullscreenImg.src = song.image;
                    fullscreenImage.style.display = 'flex';
                }
            });
            listaSeleccionadas.appendChild(songElement);
        });
    } else {
        listaSeleccionadas.innerHTML = '<li>No hay canciones seleccionadas.</li>';
    }

    // Ocultar la imagen al hacer click fuera de pantalla
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