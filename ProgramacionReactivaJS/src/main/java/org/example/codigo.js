const { from, of} = require("rxjs");

const { delay, concatMap } = require("rxjs/operators");

const readline = require('readline'); // Leer lo que escriben los usuarios

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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
    new Estudiante("Ricardo", "Alcaraz", "555555", 12, "La Dolorosa"),
    new Estudiante("Ariana", "Grande", "666666", 11, "Eugenio Espejo"),
    new Estudiante("Luis", "Sney", "777777", 13, "La Dolorosa")
];

// CÓDIGO

rl.question(`HOLA CÓMO ESTÁS, QUISIERA MOSTRAR MI CÓDIGO REACTIVO\nESTE PEQUEÑO PROYECTO QUIERE DEMOSTRAR CÓMO FUNCIONA LA PROGRAMACIÓN REACTIVA,\nSE MOSTRARÁN MENSAJES MIENTRAS ELIGES LO QUE DESEAS HACER\n¿DESEA CONTINUAR?\n[SÍ] [NO]\n`,
    (YN) => {
        const rsta = YN.toLowerCase();
        switch (rsta) {
            case "si":
            case "sí":
                indice()
                break;

            case "no":
                console.log(`Entiendo tu decisión\nTen un lindo día uwu`)
                process.exit();
                break;

            default:
                console.log("LO SIENTO NO PUEDO LEER ESTO")
                process.exit();
                break;
        }

        return;
    }
);

const indice = () => {
    rl.question('¿Qué desea hacer?\nImprimir la lista de estudiantes: [1]\nFiltrar estudiantes por edad: [2]\nSalir: [3]\n', (num) => {
        const rsta = parseInt(num); // Verificar si lo ingresado es válido
        if (isNaN(rsta)) {
            console.log("Por favor, ingresa un número válido.");
            rl.close();
            return;
        } // Si no lo es devuelve esto

        switch (rsta) {
            case 1:
                imprimirListaEstudiantes();
                break;
            case 2:
                estudiantesTalEdad();
                break;
            case 3:
                console.log("Hasta luego. ¡Adiós!");
                process.exit();
                return;

            default:
                console.log(`No puedo leer eso\nIntentalo de nuevo\n`);
                break;
        }
        rl.close();
    });
    console.log(`¿HOLA CÓMO ESTÁS? ¿QUÉ? ¿AÚN NO DEBÍA SALIR? PERDÓN Y ADIÓS, OLVIDA ESTE MENSAJE`)
}

// MÉTODOS

const imprimirListaEstudiantes = () => {
    console.log(`LISTA DE ESTUDIANTES`);

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

    console.log(`ESTE NO ES UN MENSAJE ERROR, ES UN MENSAJE REACTIVO`)
    console.log(`Perdón Ingeniero, recién estoy aprendiendo`)
};

const estudiantesTalEdad = () => {
    rl.question('Edad para filtrar: ', (respuesta) => {
        const edadFiltro = parseInt(respuesta); // Verificar si lo ingresado es válido
        if (isNaN(edadFiltro)) {
            console.log("Por favor, ingresa un número válido.");
            rl.close();
            return;
        } // Si no lo es devuelve esto

        const estFiltrados = estObs.pipe(
            filter(estudiante => estudiante.edad > edadFiltro)
        ); // si lo es procede a filtrarse la lista de estudiantes

        estFiltrados.subscribe(estudiante => {
            console.log(`Estudiante mayor de ${edadFiltro} años: ${estudiante.nombre}`);
        });

        rl.close();
    });
};


/*
* BORRADOR
*
*
        if (rsta !== "sí" || rsta !== "si" || rsta !== "no") {
            console.log("LO SIENTO NO PUEDO LEER ESTO")
        }
* */