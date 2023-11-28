let usuario = localStorage.getItem('Admin');
let nombre = document.getElementById('usuario');

nombre.innerHTML = ('Hola '+ usuario+'!' ); //cambia algo de la etiqueta
nombre.style.textAlign = 'center';

 nombre.style.color = 'red';

 nombre.innerText = usuario //escribe dentro de la etiqueta

setTimeout(() => {nombre.style.color = 'green'; // Resolvemos la promesa después de esperar 5 segundos
  }, 5000)
