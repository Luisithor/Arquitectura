const boton = document.getElementById('enviar');

boton.addEventListener('click', async() => {
    const correo = document.getElementById('correo').value;
    const contrasenia = document.getElementById('contrasenia').value;


    try {
        const result = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({correo: correo, contrasenia: contrasenia})
        });

        const data = await result.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
    ;
});



function modificarPersonal() {
    const id = document.getElementById('personalIdModificar').value;
    const nombre = document.getElementById('nombreModificar').value;

    fetch(`http://localhost:3000/personal/modificarPersonal/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre})
    })
            .then(response => {
                if (response.ok) {
                    alert('Personal modificado con éxito');
                } else {
                    alert('Error al modificar personal');
                }
            })
            .catch(error => console.error('Error:', error));
}

// Función para eliminar personal
function eliminarPersonal() {
    const id = document.getElementById('personalIdEliminar').value;

    fetch(`http://localhost:3000/personal/eliminarPersonal/${id}`, {// Asegúrate de que 'id' no esté vacío
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
            .then(response => {
                if (response.ok) {
                    alert('Personal eliminado con éxito');
                } else {
                    alert('Error al eliminar personal');
                }
            })
            .catch(error => console.error('Error:', error));
}

function crearPersonal() {
    const nombre = document.getElementById('nombreCrear').value;
    const correo = document.getElementById('correoCrear').value;
    const telefono = document.getElementById('telefonoCrear').value;
    const curp = document.getElementById('curpCrear').value;
    const tipoContrato = document.getElementById('tipoContratoCrear').value;
    const fechaIngreso = document.getElementById('fechaIngresoCrear').value; // Cambiado a tipo date
    const area = document.getElementById('areaCrear').value;

    fetch('http://localhost:3000/personal/crearPersonal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre,
            email: correo,
            telefono,
            curp,
            tipo_contrato: tipoContrato,
            fecha_ingreso: fechaIngreso,
            area
        })
    })
            .then(response => {
                if (response.ok) {
                    alert('Personal creado con éxito');
                } else {
                    alert('Error al crear personal');
                }
            })
            .catch(error => console.error('Error:', error));
}



