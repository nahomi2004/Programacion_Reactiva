const { from, of} = require("rxjs");

const { delay, concatMap } = require("rxjs/operators");

const frutas = ["pera", "sandía", "mora", "fresa", "manzana"];

// Observable

console.log(`Ya hice mi pedido`)

const frutasObs = from(frutas).pipe(
    concatMap(p => of(p).pipe(delay(1000)))
);

frutasObs.subscribe((frutas) => {
    console.log(`Me llegó una ${frutas}`)
})

console.log(`Me llegó mi pedido`)