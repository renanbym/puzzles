// Um número primo é definido se ele possuir exatamente dois divisores: o número um e ele próprio. São exemplos de números primos: 2, 3, 5, 101, 367 e 523.
//
// Neste problema, você deve ler uma palavra composta somente por letras [a-zA-Z]. Cada letra possui um valor específico, a vale 1, b vale 2 e assim por diante, até a letra z que vale 26. Do mesmo modo A vale 27, B vale 28, até a letra Z que vale 52.
//
// Você precisa definir se cada palavra em um conjunto de palavras é prima ou não. Para ela ser prima, a soma dos valores de suas letras deve ser um número primo.


function numberWord( txt ){
    return txt.split("")
    .reduce( (acc,v) => {
        let n = /[A-Z]/.test( v ) ? (v.charCodeAt(0) - 38 ) : (v.charCodeAt(0) - 96 )
        return acc + n;
    }, 0 )
}


function problema( txt ){
    return txt.split(" ").map(  (cur) => {
        let p = numberWord(cur) % 2 === 1 ? "primo" : "não primo"
        return [cur, p, numberWord(cur)]
    })
}

console.log( problema('o rato roeu a roupa do rei de roma') );
