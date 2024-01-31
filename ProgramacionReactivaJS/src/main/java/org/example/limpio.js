const { from, of} = require("rxjs");

const { delay, concatMap } = require("rxjs/operators");

// Crear clase estudiante

class Estudiante {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.observadores = [];
    }

    add(observador) {
        this.observadores.push(observador);
    }

    notify() {
        this.observadores.forEach(observador => {
            observador.update(this);
        });
    }

    nombreCompleto() {
        return this.nombre + this.apellido;
    }
}

class Docente {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    update(estudiante) {
        console.log(`Al estudiante ${estudiante.nombreCompleto()} se le agregó un profesor supervisor ${this.nombreCompleto()}`);
    }
    nombreCompleto() {
        return this.nombre + this.apellido;
    }
}

// Lista de Estudiantes

const listEstudiantes = [
    new Estudiante("Geovanna", "Vivanco"),
    new Estudiante("Ricardo", "Alcaraz"),
    new Estudiante("Ariana", "Grande")
];

const listDocentes = [
    new Docente("José", "Armijos"),
    new Docente("Daniel", "Mendieta"),
    new Docente("María", "Marcelido")
];

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

const ejecutable = () => {
    console.log(`VAMOS A IMPRIMIR UNA LISTA DE ESTUDIANTES, MIENTRAS SE EJECUTAN OTRAS FUNCIONES`)

    imprimirListaEstudiantes(listEstudiantes)

    console.log(`SEGÚN LO QUE SABEMOS PRIMERO DEBERÍA SALIR LA LISTA DE ESTUDIANTES Y DE AHÍ ESTE MENSAJE`)
    console.log(`EN PROGRAMACIÓN REACTIVA NO FUNCIONA ASÍ`)

    patroObserver(listDocentes,listEstudiantes)
}

ejecutable()