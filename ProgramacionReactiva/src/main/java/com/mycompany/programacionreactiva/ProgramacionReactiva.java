/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Project/Maven2/JavaApp/src/main/java/${packagePath}/${mainClassName}.java to edit this template
 */

package com.mycompany.programacionreactiva;
import io.reactivex.rxjava3.core.Observable;
/**
 *
 * @author D E L L
 */
public class ProgramacionReactiva {

    public static void main(String[] args) {
        String[] frutas = {"sandía", "pera", "fresa", "mora", "manzana"};

        // Convertir el arreglo en un Observable
        Observable<String> observableFrutas = Observable.fromArray(frutas);
        
        String uwu = "Me llegó una ";
        
        System.out.println("Me voy a comprar una fruta");
        // Imprimir cada fruta con un segundo de retraso
        observableFrutas
            .concatMap(fruta -> Observable.just(uwu + fruta + "\n").delay(1, java.util.concurrent.TimeUnit.SECONDS))
            .blockingSubscribe(System.out::println);
        
        System.out.println("Llegó mi pedido");
    }
}
