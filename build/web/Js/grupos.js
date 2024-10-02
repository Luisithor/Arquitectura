document.addEventListener("DOMContentLoaded", function() {
    const gruposContainer = document.getElementById('grupos');
    const loader = document.getElementById('loader');
    const formGrupo = document.getElementById('form-grupo');
    const mensajeDiv = document.getElementById('mensaje');

    // Función para obtener los grupos desde el servidor
    function obtenerGrupos() {
        loader.style.display = 'block'; // Mostrar el loader mientras se obtienen los datos

        fetch('http://localhost:5500/api/grupos') // URL del microservicio para obtener los grupos
            .then(response => response.json())
            .then(data => {
                loader.style.display = 'none'; // Ocultar el cargador

                // Limpiar contenido anterior
                gruposContainer.innerHTML = ''; 
                
                // Mostrar los grupos en la página
                data.forEach(grupo => {
                    const grupoDiv = document.createElement('div');
                    grupoDiv.classList.add('grupo');
                    
                    grupoDiv.innerHTML = `
                        <h2>${grupo.nombre}</h2>
                        <p>Periodo: ${grupo.periodo}</p>
                        <p>Profesor: ${grupo.profesor}</p>
                        <p>Carrera: ${grupo.carreraNombre}</p>
                    `;
                    
                    gruposContainer.appendChild(grupoDiv);
                });
            })
            .catch(error => {
                loader.style.display = 'none'; // Ocultar el cargador en caso de error
                gruposContainer.innerHTML = '<p>Error al cargar los grupos.</p>';
                console.error('Error:', error);
            });
    }

    // Función para agregar un nuevo grupo
    formGrupo.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const periodo = document.getElementById('periodo').value; // Asegúrate de tener este campo
        const idCarrera = document.getElementById('idCarrera').value; // Asegúrate de tener este campo
        const profesor = document.getElementById('profesor').value; // Asegúrate de tener este campo

        // Enviar los datos al servidor
        fetch('http://localhost:5500/api/grupos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, periodo, idCarrera, profesor }) // Datos a enviar
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el grupo: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Mostrar mensaje de éxito
            mensajeDiv.innerText = `Grupo agregado con éxito.`;
            obtenerGrupos(); // Actualizar la lista de grupos
            document.getElementById('nuevo-grupo').style.display = 'none'; // Ocultar el formulario
            formGrupo.reset(); // Limpiar el formulario
        })
        .catch(error => {
            console.error('Error:', error);
            mensajeDiv.innerText = 'Error al agregar el grupo.';
        });
    });

    // Ejecutar la función al cargar la página
    obtenerGrupos();
});

document.getElementById('mostrar-form').addEventListener('click', function() {
            document.getElementById('nuevo-grupo').style.display = 'block'; // Mostrar el formulario
        });

        // Cerrar el formulario al hacer clic en el botón de cierre
        document.getElementById('close-modal').addEventListener('click', function() {
            document.getElementById('nuevo-grupo').style.display = 'none'; // Ocultar el formulario
        });