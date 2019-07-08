// O sistema de numeração romana (ou números romanos) desenvolveu-se na Roma Antiga e utilizou-se em todo o seu Império. Neste sistema as cifras escrevem-se com determinadas letras, que representam os números. As letras são sempre maiúsculas, já que no alfabeto romano não existem as minúsculas, as letras são I, V, X, L, C, D e M.

// Sua tarefa é desenvolver um programa que converta números indo-arábicos para o formato romano e vice-versa. As regras para a formação dos números romanos são apresentadas a seguir.

// Uma vez que na numeração romana só podemos repetir cada letra três vezes, o maior número possível de escrever seria: 
// MMMCMXCIX, ou seja, 3 999 

// Cada letra corresponde a um determinado valor:

// I = 1
// V = 5
// X = 10
// L = 50
// C = 100
// D = 500
// M = 1000
// Agrupando as letras acima, podemos representar os números de acordo com um conjunto de regr
// Com exceção de V, L e D, os outros numerais podem se repetir no máximo três vezes:
// III = 3
// XXX = 30
// CCC = 300
// MMM = 3000
// Quando escritos à direita de numerais maiores, I, X e C somam-se aos valores dos primeiros:
// VIII = 5 + 1 + 1 + 1 = 8
// LXII = 50 + 10 + 1 + 1 = 62
// CLVIII = 158
// MCXX = 1000 + 100 + 10 + 10 = 1120
// Mas se os numerais I, X e C estiverem à esquerda dos maiores, seus valores são subtraídos como, por exemplo, em:
// IV = 5 - 1 = 4
// IX = 10 - 1 = 9
// XC = 100 - 10 = 90

const romanos = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
const arabicos = [1, 5, 10, 50, 100, 500, 1000];

const arabico2romano = (algarismo, absoluto) => {

    if (absoluto == 0) return;

    let idx = arabicos.findIndex(cur => cur == algarismo);
    if (absoluto > 3) {

        if (absoluto == 4) {
            return romanos[idx] + romanos[idx + 1];
        }

        if (absoluto == 5) {
            idx = arabicos.findIndex(cur => cur == absoluto * algarismo);
            return romanos[idx];
        }

        if (absoluto > 5 && absoluto < 9) {
            return romanos[idx + 1] + romanos[idx].repeat(absoluto - 5);
        }

        if (absoluto == 9) {
            return romanos[idx] + romanos[idx + 2];
        }

    } else {
        if (romanos[idx].repeat(absoluto)) {
            return romanos[idx].repeat(absoluto)
        };
    }

    throw 'Falha ao converter numero romano';

}

const romano2arabico = (arrRomanos) => {
    if (/([I]{4,}|[V]{4,}|[X]{4,}|[L]{4,}|[C]{4,}|[D]{4,}|[M]{4,})/i.test(arrRomanos.join(''))) {
        throw 'Numero romano inválido';
    }

    let sum = 0;
    for (let n in arrRomanos.reverse()) {

        let idx = romanos.findIndex(cur => cur == arrRomanos[n]);
        let previdx = romanos.findIndex(cur => cur == arrRomanos[parseFloat(n) - 1]);

        if (arabicos[idx] < arabicos[previdx]) {
            sum -= arabicos[idx];
        } else {
            sum += arabicos[idx];
        }
    }

    return sum;
}

const calc = (number) => {
    const result = [];
    const splitNumber = String(number).split('');
    const tamanho = splitNumber.length;
    let tempTamanho = tamanho;

    if (/[0-9]/.test(number)) {
        for (const n of splitNumber) {
            let algarismo = Math.pow(10, tempTamanho) / 10;

            if (tempTamanho > 4) {
                throw new Error('Uma vez que na numeração romana só podemos repetir cada letra três vezes, o maior número possível de escrever seria 3999');
            } else {
                result.push(arabico2romano(algarismo, n));
            }

            --tempTamanho;
        }
    } else {
        const sum = romano2arabico(splitNumber);
        result.push(sum)
    }


    return result.join('');
}

const f = Array.from({ length: 3999 });

/*
teste
*/
// const resultTeste = [];
// for (const t in f) {
//     const number = parseFloat(t) + 1;
//     const romano = calc(number);
//     const arabico = calc(romano);
//     if (arabico != number) {
//         console.log(romano, arabico, number);
//     } else {
//         resultTeste.push([romano, arabico, number])
//     }
// }
// console.log(resultTeste);

// console.log(calc(2346), calc('MMCCCXLVI'));
// console.log('');
// console.log(calc('CL'), calc(150));
// console.log('');
// console.log(calc('CLVIII'), calc(158));
// console.log('');
// console.log(calc('MMMCMXCIX'), calc('3999'));
// console.log('');
// console.log(calc('XXX'), calc(30));