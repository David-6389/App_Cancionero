import { supabase } from './BD/supabase.js';

async function agregarCanciones() {
    const canciones = [
        {
            nombre: "Cambiare mi tristeza",
            imagen: "https://dqnrueyhwjbaxkgfcomq.supabase.co/storage/v1/object/public/canciones-tonosyacordes//Cambiare_mi_tristeza.jpg", // Reemplaza con la URL de la imagen
            tono: "A",
            Rango_voz: "Varon"
        },
        {
            nombre: "Ven, es hora de Adorarte",
            imagen: "https://dqnrueyhwjbaxkgfcomq.supabase.co/storage/v1/object/public/canciones-tonosyacordes//Ven_es_hora_de_adorarle.jpg",
            tono: "G",
            Rango_voz: "Varon"
        }
    ];

    // Insertar las canciones en Supabase
    const { data, error } = await supabase
        .from('t_canciones')
        .insert(canciones);

    if (error) {
        console.error('Error insertando canciones:', error);
    } else {
        console.log('Canciones insertadas correctamente:', data);
    }
}

// Llamar a la función para agregar las canciones
agregarCanciones();