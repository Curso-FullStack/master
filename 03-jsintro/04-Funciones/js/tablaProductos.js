console.log('Nuestros Productos linkeado correctamente');

let boton = document.getElementById('MostrarDatos');
let productos = JSON.parse(localStorage.getItem('Productos'));
let tabla = document.getElementById('miTabla');

boton.addEventListener('click', (e) => {
  e.preventDefault();

  // Elimina las filas existentes en la tabla antes de agregar las nuevas
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }

  // Por cada elemento del array en el localStorage, creamos una fila y la añadimos en HTML
  for (let i = 0; i < productos.length; i++) {
    // Creamos la fila    
    let fila = document.createElement('tr');

    // Creamos 4 celdas
    let celdaNombre = document.createElement('td');
    let celdaPrecio = document.createElement('td');
    let celdaStock = document.createElement('td');
    let celdaDescripcion = document.createElement('td');

    // Asignamos los datos a las celdas
    celdaNombre.textContent = productos[i].nombre;
    celdaStock.textContent = productos[i].cantidad;
    celdaPrecio.textContent = productos[i].precio;
    celdaDescripcion.textContent = productos[i].descripcion;

    // Agregamos las celdas a la fila
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaStock);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaDescripcion);

    // Agregamos la fila a la tabla
    tabla.appendChild(fila);
  }
});
