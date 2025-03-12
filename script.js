// script.js
document.addEventListener('DOMContentLoaded', function() {
    const songList = document.querySelector('.song-list');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const fullscreenImg = fullscreenImage.querySelector('img');
    const guardarBtn = document.getElementById('guardar');

    // Array de canciones
    const songs = [
        { name: "Cambiare mi tristeza", image: "./Canciones/Cambiare_mi_tristeza.jpg" },
        { name: "Ven, es hora de adorarle", image: "./Canciones/Ven_es_hora_de_adorarle.jpg" }
        // Agrega más canciones aquí
    ];

    // Crear y agregar las canciones al DOM
    songs.forEach(song => {
        const songElement = document.createElement('div');
        songElement.classList.add('song');
        // songElement.textContent = song.name;
        // songElement.setAttribute('data-image', song.image);

        // Checkbox para seleccionar la canción
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = song.name;
        checkbox.addEventListener('click', function(event) {
            event.stopPropagation(); // Evita que el evento se propague al contenedor
        });
        songElement.appendChild(checkbox);

        // Nombre de la canción
        const songName = document.createElement('span');
        songName.textContent = song.name;
        songName.addEventListener('click', function() {
            const imageUrl = song.image; //this.getAttribute('data-image');
            fullscreenImg.src = imageUrl;
            fullscreenImage.style.display = 'flex';
        });
        songElement.appendChild(songName);

        // Agregar la canción al contenedor
        songList.appendChild(songElement);
    });

    // Guardar las canciones seleccionadas
    guardarBtn.addEventListener('click', function() {
        const selectedSongs = [];
        document.querySelectorAll('.song input[type="checkbox"]:checked').forEach(checkbox => {
            selectedSongs.push(checkbox.value); // Agrega el nombre de la canción seleccionada
        });

        // Guardar en localStorage
        localStorage.setItem('selectedSongs', JSON.stringify(selectedSongs));
        localStorage.setItem('allSongs', JSON.stringify(songs)); //Guardo el array completo de canciones
        alert('Lista Creada!!!');
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