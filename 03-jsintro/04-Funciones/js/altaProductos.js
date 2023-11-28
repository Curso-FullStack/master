
//obtenemos el tag al que le daremos el evento
let enviarDatos = document.getElementById("enviarDatos");
let misProductos = [];
let miFormulario = document.getElementById("formulario-productos");



//asigno un listener a una variable -> Cuando el cliente haga <x> se ejecute 
//algo
//add event listener recibe funciones 
enviarDatos.addEventListener(`click`, (e) => {


    let nombreProducto = document.getElementById("nombreProducto").value;
    let precioProducto = document.getElementById("precioProducto").value;
    let cantidadProducto = document.getElementById("cantidadStock").value;
    let descripcionProducto = document.getElementById("descripcionProducto").value;

    e.preventDefault(); /* previene que cargue la funcion antes de que se
    efectue el llamado del evento. aveces cuando se carga el archivo js se 
    llama a las funciones  */

   // console.log(`el producto guardado es ${nombreProducto}`);

    if (nombreProducto === "" || precioProducto === "" || cantidadProducto === "" || descripcionProducto === "") {
        alert("Debe completar todos los datos");
        return;
    } else {cargarDatos(nombreProducto,precioProducto,cantidadProducto,descripcionProducto);};
    miFormulario.reset();
});



//cambiar algo en el producto
const cargarDatos = (nombre,precio,cantidad,descripcion) => {
 //CARGA E IMPRESION POR ARRAY
 let producto = {
    nombre: nombre,
    cantidad: cantidad,
    precio: precio,
    descripcion: descripcion,

}

console.log(producto);
misProductos.push(producto); //agrega a array
//Limpiar los elementos del formulario

// key value,variable. keyvalue es el nombre de la variable
localStorage.setItem('Productos',JSON.stringify(misProductos) );
//el valor de la var que introduzco lo tengo que pasar a JSON
// STRINGIFY: JS A JSON y PARSE: JSON A JS
//La ingormacion del local storage no se elimina, se utiliza entre paginas y aperturas.


console.log(misProductos);
console.log(`cantidad de elem ${misProductos.length}`);


}