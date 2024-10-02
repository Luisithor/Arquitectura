// Función para modificar un usuario
function modificarUsuario() {
    const id = document.getElementById('usuarioIdModificar').value;
    const nombre = document.getElementById('nombreModificar').value;

    fetch(`http://localhost:3000/usuario/modificarUsuario/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
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

    fetch(`http://localhost:3000/usuario/eliminarUsuario/${id}`, {
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
    const estatus = document.getElementById('estatusCrear').value === "true"; // Convertir a booleano

    fetch('http://localhost:3000/usuario/crearUsuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            contrasenia,
            email: correo,
            rol,
            estatus
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Usuario creado con éxito');
        } else {
            alert('Error al crear usuario');
        }
    })
    .catch(error => console.error('Error:', error));
}
