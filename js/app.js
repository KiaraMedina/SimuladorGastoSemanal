//VARIABLES
const presupuestoUsuario = prompt('Cual es tu presupuesto Semanal?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//CLASES
//Clases del presupuesto
class Presupuesto {
    constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
    }

    //Metodo par ir restando del presupuesto actual
    presupuestoRestante(cantidad = 0) {
        return this.restante -= Number(cantidad);

    }
}
//maneja todo lo relacionado al html
class Interfaz {
    insertarPresupuesto(cantidad) {
        const presupuestoSpan = document.querySelector('span#total');
        const restanteSpan = document.querySelector('span#restante');

        //insetando al html

        presupuestoSpan.innerHTML = `${cantidad}`;
        restanteSpan.innerHTML = `${cantidad}`;
    }

    imprimirMensaje(mensaje, tipo) {

        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');

            setTimeout(function() {
                document.querySelector('.mensaje').remove();
            }, 3000);

        } else {

            setTimeout(function() {
                document.querySelector('.mensaje').remove();
            }, 2000);

            div.classList.add('mensaje', 'correcto');
        }

        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div, document.querySelector('.mostrar'));
    }

    //Inserta los datos a la lista
    agregarGastoListado(nombre, cantidad) {
        const gastosListado = document.querySelector('#listaGastos ul');

        //creando un li
        const li = document.createElement('li');
        li.classList = 'listaUl';

        //insertar gasto
        li.innerHTML = `
            ${nombre}
            <span class="decorateDolar"> S/ ${cantidad} </span>
        
        `;
        gastosListado.appendChild(li);
    }

    //comprueba el presupuesta restante
    presupuestoRestante(cantidad) {
        const restante = document.querySelector('span#restante');
        //leemos el presupuesto restante
        const presupuestoRestanteUsuario = cantidadPresupuesto.presupuestoRestante(cantidad);

        restante.innerHTML = `${presupuestoRestanteUsuario}`;
        this.comprobarPresupuesto();
    }

    //Cambia de color el presupuesto restante
    comprobarPresupuesto() {
        const presupuestoTotal = cantidadPresupuesto.presupuesto;
        this.presupuestoRestante = cantidadPresupuesto.restante;

        //comprobar el 25%
        if ((presupuestoTotal / 4) > this.presupuestoRestante) {
            const restante = document.querySelector('.restantes');
            restante.classList.remove('alert-success', 'alert-warning');
            restante.classList.add('alert-danger');
        } else if ((presupuestoTotal / 2) > this.presupuestoRestante) {
            const restante = document.querySelector('.restantes');
            restante.classList.remove('alert-success');
            restante.classList.add('alert-warning');

        }
    }



}
//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', function() {
    if (presupuestoUsuario === null || presupuestoUsuario === "") {
        window.location.reload();
    } else {
        //Instanciar el presupuesto
        cantidadPresupuesto = new Presupuesto(presupuestoUsuario);

        const ui = new Interfaz();
        ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
    }


});

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    //leer del formulario
    const nombreGasto = document.querySelector('#gasto').value;


    const cantidadGasto = document.querySelector('#cantidadG').value;

    //instanciando la interbaz
    const ui = new Interfaz();
    if (nombreGasto === "" || cantidadGasto === "") {
        //mensaje y tipo
        ui.imprimirMensaje('Hubo un error, complete los campos', 'error');
    } else {
        ui.imprimirMensaje('Datos correctos', 'correcto');
        ui.agregarGastoListado(nombreGasto, cantidadGasto);
        ui.presupuestoRestante(cantidadGasto);

    }
});