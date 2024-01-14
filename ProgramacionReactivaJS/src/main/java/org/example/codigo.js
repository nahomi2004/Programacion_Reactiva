const { from, of} = require("rxjs");

const { delay, concatMap } = require("rxjs/operators");

// Crear clase estudiante

class Estudiante {
    constructor(nombre, apellido, cedula, edad, colegio) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.edad = edad;
        this.colegio = colegio;
    }

    nombreEst() {
        return this.nombre;
    }

    apellidoEst() {
        return this.apellido;
    }

    nombreCompleto() {
        return this.nombre + this.apellido;
    }

    numCedula() {
        return this.cedula;
    }

    edadEst() {
        return this.edad;
    }

    nombreColegio() {
        return this.colegio;
    }
}

// Lista de Estudiantes

const estudiantes = [
    new Estudiante("José", "Armijos", "111111", 12, "APC"),
    new Estudiante("Daniel", "Mendieta", "222222", 11, "APC"),
    new Estudiante("María", "Marcelido", "333333", 12, "Eugenio Espejo"),
    new Estudiante("Geovanna", "Vivanco", "444444", 13, "Marianas"),
];

// Observable

console.log(`LISTA DE ESTUDIANTES`)

const estObs = from(estudiantes).pipe(
    concatMap((estudiante) => of(estudiante).pipe(delay(1000)))
);

estObs.subscribe((estudiante) => {
    console.log(`Estudiante ${estudiantes.indexOf(estudiante) + 1}`);
    console.log(`NombreCompleto: ${estudiante.nombreCompleto()}`);
    console.log(`Cédula: ${estudiante.numCedula()}`);
    console.log(`Edad: ${estudiante.edadEst()}`);
    console.log(`Colegio al que representa: ${estudiante.nombreColegio()}`);
    console.log("---------------------\n");
});
