document.addEventListener("DOMContentLoaded", function() {
    const loader = document.getElementById('loader');
    const calificacionesContainer = document.getElementById('calificaciones');
    const selectAlumnos = document.getElementById('select-alumnos');
    const API_URL = 'http://localhost:5500/api';

    function mostrarError(mensaje) {
        calificacionesContainer.innerHTML = `<p class="error">${mensaje}</p>`;
    }

    function obtenerAlumnos() {
        fetch(`${API_URL}/alumnos`)
            .then(response => {
                if (!response.ok) throw new Error('Error al obtener la lista de alumnos');
                return response.json();
            })
            .then(data => {
                data.forEach(alumno => {
                    const option = document.createElement('option');
                    option.value = alumno.idAlumno;
                    option.textContent = alumno.nombre;
                    selectAlumnos.appendChild(option);
                });
            })
            .catch(error => {
                console.error('Error al cargar alumnos:', error);
                mostrarError('No se pudo cargar la lista de alumnos. Por favor, intenta más tarde.');
            });
    }

    function obtenerCalificaciones(alumnoId) {
        if (!alumnoId) {
            mostrarError('Por favor, selecciona un alumno.');
            return;
        }

        loader.style.display = 'block';
        calificacionesContainer.innerHTML = '';

        fetch(`${API_URL}/alumnos/${alumnoId}/calificaciones`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener las calificaciones');
                }
                return response.json();
            })
            .then(data => {
                loader.style.display = 'none';
                if (data.length === 0) {
                    calificacionesContainer.innerHTML = '<p>No hay calificaciones disponibles para este alumno.</p>';
                    return;
                }
                data.forEach(calificacion => {
                    const calificacionDiv = document.createElement('div');
                    calificacionDiv.classList.add('calificacion');
                    calificacionDiv.innerHTML = `
                        <h3>Grupo: ${calificacion.grupoNombre}</h3>
                        <p>Periodo: ${calificacion.periodo}</p>
                        <p>Primer Parcial: ${calificacion.primerParcial}</p>
                        <p>Segundo Parcial: ${calificacion.segundoParcial}</p>
                        <p>Tercer Parcial: ${calificacion.tercerParcial}</p>
                    `;
                    calificacionesContainer.appendChild(calificacionDiv);
                });
            })
            .catch(error => {
                loader.style.display = 'none';
                console.error('Error:', error);
                mostrarError('Error al cargar las calificaciones. Por favor, intenta de nuevo más tarde.');
            });
    }

    selectAlumnos.addEventListener('change', function() {
        const alumnoId = this.value;
        if (alumnoId) {
            obtenerCalificaciones(alumnoId);
        } else {
            calificacionesContainer.innerHTML = '';
        }
    });

    obtenerAlumnos();
});