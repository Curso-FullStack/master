//DEFINICION DE FUNCIONES NATIVAS -> ES5 VERSION JS

/* SINTAXIS
function name(params) {
    
}

*/

//definicion
function guardarDatos() {
    let dni = 44671942;
    let nombreApellido = `Aaron Chiappella`;

    //codigo para guardar

    console.log(`Tus datos han sido guardado exitosamente!`);
}

//invocacion
guardarDatos();

//la definicion de parametros son locales, es decir solo se usan en la funcion.
function sumar(num_a, num_b) {
    console.log(num_a + num_b);
}
//UNA FUNCION SIRVE PARA FACTORIZAR UNA OPERACION RECURRENTE
sumar(1, 3);


function login(email, password, facial) {
    if (email == `aaronchiappella@gmail.com` && password == `1234` && facial == true) {
        respuesta = `Bienvenido a la app`;
        // return respuesta; //CORTA LA EJECUCION Y DEVUELVE
        console.log(`Bienvenido a la app`); //No se devuelve por el return previo
    } else {
        respuesta = `No tienes acceso a la app`;
        // return respuesta;
        console.log(`No tienes acceso`);
    }
}

/*
//POR POSITIVO
response = login(`aaronchiappella@gmail.com`,`1234`,true);
console.log(response);


//POR NEGATIVO
response = login(`aaronchiappella@gmail.com`,`14`,true);
console.log(response);
*/

//[[[[Funciones callback]]]] 
function validacion(token, callback) {
    console.log(`Token es ${token} y es valido!`);
    email = `aaronchiappella@gmail.com`;
    password = `1234`;
    facial = true;
    callback(email, password, facial); //funcion que recibe otra funcion como PARAMETROS
    //CALLBACK SE EJECTURA DENTRO DE VALIDACION

    guardarDatos();
}


validacion(`12345odkans`, login);


//funcion nativaa
function name() {

}


//Funcion anonima, no tiene nombre, y toma el nombre de la variable que la contiene
//al cambiar la variable cambio su identidad 
const calcularSaldo = function (saldo, compra) {
    return saldo - compra;
}

console.log(calcularSaldo(1000, 700));

//arrow function : funcion guardada en una variable.
const calculoDeuda = (saldo, compra) => {
    return saldo - compra;
}

console.log(calculoDeuda(1000,700
    ));

