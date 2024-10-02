document.addEventListener('DOMContentLoaded', () => {
    fetchAspirantes();
    fetchPeriodos();

    const aspiranteForm = document.getElementById('aspirante-form');
    aspiranteForm.addEventListener('submit', createAspirante);
});

async function fetchAspirantes() {
    try {
        const response = await fetch('http://localhost:8080/api/aspirantes');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const aspirantes = await response.json();
        const aspirantesList = document.getElementById('aspirantes-list');
        aspirantesList.innerHTML = ''; // Limpiar la lista

        aspirantes.forEach(aspirante => {
            const div = document.createElement('div');
            div.classList.add('aspirante');
            div.innerHTML = `
                <p><strong>Nombre:</strong> ${aspirante.nombre}</p>
                <p><strong>Apellido:</strong> ${aspirante.apellido}</p>
                <p><strong>Correo:</strong> ${aspirante.correo}</p>
            `;
            aspirantesList.appendChild(div);
        });
    } catch (error) {
        console.error('Error al obtener aspirantes:', error);
    }
}

async function createAspirante(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;

    const aspirante = {
        nombre,
        apellido,
        correo
    };

    try {
        const response = await fetch('http://localhost:8080/api/aspirantes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(aspirante)
        });

        if (!response.ok) {
            throw new Error('Error al crear aspirante: ' + response.status);
        }

        document.getElementById('aspirante-form').reset();
        fetchAspirantes(); // Actualizar la lista de aspirantes
    } catch (error) {
        console.error(error);
    }
}

async function fetchPeriodos() {
    try {
        const response = await fetch('http://localhost:8080/api/periodo');
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        const periodos = await response.json();
        const periodosList = document.getElementById('periodos-list');
        periodosList.innerHTML = ''; // Limpiar la lista

        periodos.forEach(periodo => {
            const div = document.createElement('div');
            div.classList.add('periodo');
            div.innerHTML = `
                <p><strong>Nombre del Periodo:</strong> ${periodo.nombre}</p>
                <p><strong>Fecha de Inicio:</strong> ${periodo.fechaInicio}</p>
                <p><strong>Fecha de Fin:</strong> ${periodo.fechaFin}</p>
            `;
            periodosList.appendChild(div);
        });
    } catch (error) {
        console.error('Error al obtener periodos:', error);
    }
}
