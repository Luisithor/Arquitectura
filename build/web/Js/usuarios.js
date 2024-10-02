// Función para modificar un usuario
function modificarUsuario() {
    const id = document.getElementById('usuarioIdModificar').value;
    const nombre = document.getElementById('nombreModificar').value;

    fetch(`http://localhost:3001/usuario/modificarUsuario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre})
    })
            .then(response => {
                if (response.ok) {
                    alert('Usuario modificado con éxito');
                } else {
                    alert('Error al modificar usuario');
                }
            })
            .catch(error => console.error('Error:', error));
}

// Función para eliminar un usuario
function eliminarUsuario() {
    const id = document.getElementById('usuarioIdEliminar').value;

    fetch(`http://localhost:3001/usuario/eliminarUsuario/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
            .then(response => {
                if (response.ok) {
                    alert('Usuario eliminado con éxito');
                } else {
                    alert('Error al eliminar usuario');
                }
            })
            .catch(error => console.error('Error:', error));
}

// Función para crear un nuevo usuario
function crearUsuario() {
    const nombre = document.getElementById('nombreCrear').value;
    const contrasenia = document.getElementById('contraseniaCrear').value;
    const correo = document.getElementById('correoCrear').value;
    const rol = document.getElementById('rolCrear').value;
    const estatus = document.getElementById('estatusCrear').checked; // Si es un checkbox

    // Validación de datos
    if (!nombre || !contrasenia || !correo || !rol) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    fetch('http://localhost:3001/usuario/crearUsuario', { // Cambiado a la URL correcta
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            email: correo,
            contrasenia,
            rol,
            estatus
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Personal creado con éxito');
        } else {
            return response.json().then(err => {
                alert('Error al crear personal: ' + err.message); // Mejor manejo de errores
            });
        }
    })
    .catch(error => console.error('Error:', error));
}
