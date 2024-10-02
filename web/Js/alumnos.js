document.addEventListener("DOMContentLoaded", function() {
    const alumnosContainer = document.getElementById('alumnos-container');
    const loader = document.getElementById('loader');
    const mostrarFormBtn = document.getElementById('mostrar-form');
    const nuevoAlumnoSection = document.getElementById('nuevo-alumno');

    function obtenerAlumnos() {
        loader.style.display = 'block';

        fetch('http://localhost:5500/api/alumnos')
            .then(response => response.json())
            .then(data => {
                loader.style.display = 'none';

                alumnosContainer.innerHTML = ''; 
                
                data.forEach(alumno => {
                    const alumnoDiv = document.createElement('div');
                    alumnoDiv.classList.add('alumno');
                    
                    alumnoDiv.innerHTML = `
                        <h3>${alumno.nombre}</h3>
                    `;
                    
                    alumnosContainer.appendChild(alumnoDiv);
                });
            })
            .catch(error => {
                loader.style.display = 'none'; // Ocultar el cargador en caso de error
                alumnosContainer.innerHTML = '<p>Error al cargar los alumnos.</p>';
                console.error('Error:', error);
            });
    }

    // Ejecutar la función al cargar la página
    obtenerAlumnos();

    // Mostrar el formulario para agregar un nuevo alumno
    mostrarFormBtn.addEventListener('click', function() {
        nuevoAlumnoSection.style.display = nuevoAlumnoSection.style.display === 'none' ? 'block' : 'none';
    });

    // Función para agregar un nuevo alumno
    document.getElementById('form-alumno').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;

        // Enviar los datos al servidor
        fetch('http://localhost:5500/api/alumnos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre, matricula: matricula }) // Datos a enviar
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el alumno: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Crear un nuevo div para el alumno
            const nuevoAlumnoDiv = document.createElement('div');
            nuevoAlumnoDiv.classList.add('alumno'); // Agregar clase para estilos

            // Crear el contenido del div
            nuevoAlumnoDiv.innerHTML = `
                <h3>${data.nombre}</h3>
                <p>Matrícula: ${data.matricula}</p>
            `;

            // Agregar el nuevo div al contenedor de alumnos
            alumnosContainer.appendChild(nuevoAlumnoDiv);

            // Limpiar el formulario
            document.getElementById('form-alumno').reset();

            // Mensaje de éxito
            document.getElementById('mensaje').innerText = `Alumno "${data.nombre}" agregado con éxito.`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje').innerText = 'Error al agregar el alumno.';
        });
    });
});
