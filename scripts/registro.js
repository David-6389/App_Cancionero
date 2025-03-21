import { supabase } from '../BD/supabase.js';

document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');

    registroForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma tradicional

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        // Obtener los instrumentos seleccionados
        const instrumentosCheckboxes = document.querySelectorAll('input[name="instrumentos"]:checked');
        const instrumentos = Array.from(instrumentosCheckboxes).map(checkbox => checkbox.value);

        const dirige = document.getElementById('dirige').checked;

        // Validar que se haya ingresado un nombre y al menos un instrumento
        if (!nombre || instrumentos.length === 0) {
            alert('Por favor, ingresa tu nombre y al menos un instrumento.');
            return;
        }

        // Guardar en Supabase
        const { data, error } = await supabase
            .from('t_musicos')
            .insert([{ 
                nombre: nombre,
                instrumentos: instrumentos, // Array de texto
                dirige: dirige
            }]);

        if (error) {
            console.error('Error registrando al músico/director:', error);
            alert('Hubo un error al registrarse. Por favor, intenta de nuevo.');
        } else {
            alert('¡Registro exitoso!');
            registroForm.reset(); // Limpiar el formulario después de guardar
        }
    });
});