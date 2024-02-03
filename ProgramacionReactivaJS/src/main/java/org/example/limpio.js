const { from, of} = require("rxjs");

const { delay, concatMap } = require("rxjs/operators");

// Crear clase estudiante
class Estudiante {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.observadores = [];
    }

    // Esta función se encarga de agregar un observador
    // Una analogía perfecta sería youtube, en este caso esta función es como clickear en suscribirse
    add(observador) {
        this.observadores.push(observador);
    }

    // Esta función notifica al observador
    // En este caso es como cuando el youtube sube un video y te llega la notificación
    // Recuerda, el subscritor es el observador
    notify() {
        this.observadores.forEach(observador => {
            observador.update(this);
        });
    }

    // Y esta función solo une el apellido y nombre
    nombreCompleto() {
        return this.nombre + " " + this.apellido;
    }
}

// Crear la clase Docente
class Docente {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    // Tomando la analogía anterior el subscritor es el docente
    // El/ellos supervisará/n al estudiante
    // Además se agrega un console.log para que esta acción de actualizar el observador se vea en pantalla
    update(estudiante) {
        console.log(`Al estudiante ${estudiante.nombreCompleto()} se le agregó un profesor supervisor ${this.nombreCompleto()}`);
    }

    // Y esta función solo une el apellido y nombre
    nombreCompleto() {
        return this.nombre + " " + this.apellido;
    }
}

// Lista de Estudiantes

const listEstudiantes = [
    new Estudiante("Geovanna", "Vivanco"),
    new Estudiante("Ricardo", "Alcaraz"),
    new Estudiante("Ariana", "Grande")
];

// Lista de Docentes
const listDocentes = [
    new Docente("José", "Armijos"),
    new Docente("Daniel", "Mendieta"),
    new Docente("María", "Marcelido")
];

// La siguiente función imprimirá con un segundo de retraso el nombre completo del estudiante
// Lo que hace en concat es unir (por así decirlo) al estudiante con un obsevador y este será actualizado
const imprimirListaEstudiantes = (estudiantes) =>  {
    console.log(`LISTA DE ESTUDIANTES`);

    const estObs = from(estudiantes).pipe(
        concatMap((x) => of(x).pipe(delay(1000)))
    );

    estObs.subscribe((x) => {
        console.log(`NombreCompleto: ${x.nombreCompleto()}`);
        console.log("---------------------\n");
    });

    // console.log(`ESTE NO ES UN MENSAJE ERROR, ES UN MENSAJE REACTIVO`)
    // console.log(`Perdón Ingeniero, recién estoy aprendiendo`)
};

// Esta otra función une a los Docentes(Observadores) y al estudiante
// Para luego imprimir cuando esta subscripción exista (La supervisión de cada profesor está lista.)
// Igual lo hace con un segundo de retraso
const patroObserver = (docentes, estudiantes) => {
    // Observable de Estudiantes
    const observables = from(estudiantes).pipe(
        concatMap((est) => {
            docentes.forEach(doc => est.add(doc));
            return of(est).pipe(delay(1000));
        })
    );

    observables.subscribe((est) => {
        est.notify();
    }, null, () => {
        console.log(`La supervisión de cada profesor está lista.`)
    });
};

// Por último haremos la función ejecutable que se encargará de demostrar como funcionarían estas
// dos sencillas funciones, impriendo consigo, también, "mensajes" que simulan de forma interactiva
// a la programación reactiva
const ejecutable = () => {
    console.log(`VAMOS A IMPRIMIR UNA LISTA DE ESTUDIANTES, MIENTRAS SE EJECUTAN OTRAS FUNCIONES`)

    imprimirListaEstudiantes(listEstudiantes)

    console.log(`SEGÚN LO QUE SABEMOS PRIMERO DEBERÍA SALIR LA LISTA DE ESTUDIANTES Y DE AHÍ ESTE MENSAJE`)
    console.log(`EN PROGRAMACIÓN REACTIVA NO FUNCIONA ASÍ`)

    patroObserver(listDocentes,listEstudiantes)
}

// se llama a la función ejecutable
ejecutable()