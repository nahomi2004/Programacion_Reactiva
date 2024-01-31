const { from, of, zip} = require("rxjs");

const { delay, concatMap, filter } = require("rxjs/operators");

const readline = require('readline'); // Leer lo que escriben los usuarios

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

// CÓDIGO

/*rl.question(`HOLA CÓMO ESTÁS, QUISIERA MOSTRAR MI CÓDIGO REACTIVO\nESTE PEQUEÑO PROYECTO QUIERE DEMOSTRAR CÓMO FUNCIONA LA PROGRAMACIÓN REACTIVA,\nSE MOSTRARÁN MENSAJES MIENTRAS ELIGES LO QUE DESEAS HACER\n¿DESEA CONTINUAR?\n[SÍ] [NO]\n`,
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
    rl.question('¿Qué desea hacer?\nImprimir la lista de estudiantes: [1]\nFiltrar estudiantes mayores a 10 años: [2]\nSalir: [3]\n', (num) => {
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
}*/

// MÉTODOS

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

/* const estudiantesTalEdad = () => {
    const estFiltrados = from(estudiantes).pipe(
        filter(estudiantes => estudiantes.edadEst() > 10)
    );

    const estObs = estFiltrados.pipe(
        concatMap((estudiante) => of(estudiante).pipe(delay(1000)))
    );

    console.log(`Estudiante/s mayor/es de 10 años:`)
    estObs.subscribe(estudiante => {
        console.log(`Nombre: ${estudiante.nombreCompleto()}    Edad: ${estudiante.edadEst()}`);
    });

    console.log(`MENSAJE REACTIVO, ESPERANDO A QUE EL PROCESO TERMINE`);
};*/

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