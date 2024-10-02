document.addEventListener("DOMContentLoaded", function() {
    const carrerasContainer = document.getElementById('carreras');
    const loader = document.getElementById('loader');
    const mostrarFormBtn = document.getElementById('mostrar-form');
    const nuevaCarreraSection = document.getElementById('nueva-carrera');

    // Función para obtener las carreras desde el servidor
    function obtenerCarreras() {
        loader.style.display = 'block'; // Mostrar el loader mientras se obtienen los datos

        fetch('http://localhost:5500/api/carreras') // URL del microservicio para obtener las carreras
            .then(response => response.json())
            .then(data => {
                loader.style.display = 'none'; // Ocultar el cargador

                // Limpiar contenido anterior
                carrerasContainer.innerHTML = ''; 
                
                // Mostrar las carreras en la página
                data.forEach(carrera => {
                    const carreraDiv = document.createElement('div');
                    carreraDiv.classList.add('carrera');
                    
                    carreraDiv.innerHTML = `
                        <h2>${carrera.nombre}</h2>
                    `;
                    
                    carrerasContainer.appendChild(carreraDiv);
                });
            })
            .catch(error => {
                loader.style.display = 'none'; // Ocultar el cargador en caso de error
                carrerasContainer.innerHTML = '<p>Error al cargar las carreras.</p>';
                console.error('Error:', error);
            });
    }

    // Ejecutar la función al cargar la página
    obtenerCarreras();

    // Mostrar el formulario para agregar una nueva carrera
    mostrarFormBtn.addEventListener('click', function() {
        nuevaCarreraSection.style.display = nuevaCarreraSection.style.display === 'none' ? 'block' : 'none';
    });

    // Función para agregar una nueva carrera
    document.getElementById('form-carrera').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const imagen = document.getElementById('imagen').value;

        // Enviar los datos al servidor
        fetch('http://localhost:5500/api/carreras', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nombre, imagen: imagen }) // Datos a enviar
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar la carrera: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Crear un nuevo div para la carrera
            const nuevaCarreraDiv = document.createElement('div');
            nuevaCarreraDiv.classList.add('carrera'); // Agregar clase para estilos

            // Crear el contenido del div
            nuevaCarreraDiv.innerHTML = `
                <h3>${data.nombre}</h3>
                <img src="${data.imagen}" alt="Imagen de ${data.nombre}" style="width: 100px; height: auto;">
            `;

            // Agregar el nuevo div al contenedor de carreras
            carrerasContainer.appendChild(nuevaCarreraDiv);

            // Limpiar el formulario
            document.getElementById('form-carrera').reset();

            // Mensaje de éxito
            document.getElementById('mensaje').innerText = `Carrera "${data.nombre}" agregada con éxito.`;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('mensaje').innerText = 'Error al agregar la carrera.';
        });
    });
});