/*
VARIABLES

var -> declaracion de variables GLOBALES
let -> declaracion de variables a las que se le puede limitar el alcance
const -> declaracion de constantes

JS es de tipado DINAMICO 

*/

var nombre = 'Aaron';
let edad = 50;
let apellido = "Chiappella"; //string: "" o '' 
const dni = 44671942;
let activo = true; //bool

if (activo) {
    //Con control de string simple
    //console.log('Nombre: '  + nombre +' ' +apellido );

    //Con interpolacion de variables
    console.log(`Nombre:  ${nombre} ${apellido} `);
    console.log('Edad: ' + edad);
    console.log('DNI: ' + dni);
}
else { console.log(`La persona ${nombre} ${apellido} posee un estado ${activo}`) }

console.log(`=================ACUMULADORES Y CONTAADORES =====================`)
let uno = 1;

uno ++;
console.log(uno);

uno --;
console.log(uno);

//ACUMULADOR: INCREMENTA Y ASIGNA
uno +=500;
console.log(uno);

uno +=500;
console.log(uno);


var nombre = prompt(`Ingresa tu nombre: `); //PROMPT ES UNA INTRODUCCION EN CONSOLA
alert(`Hola ${nombre}!`); //ALERT ES UNA ALERTA DE NAVEGADOR 