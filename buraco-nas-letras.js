// Buracos nas Letras

// Este problema foi utilizado em 99 Dojo(s).

// Se você pensar em um papel como um plano e uma letra como uma marcação neste plano, então estas letras dividem o plano em regiões. Por exemplo, as letras A, D e O dividem o plano em 2 pois possuem um espaço confinado em seu desenho, ou um “buraco”. Outras letras como B possuem 2 buracos e letras como C e E não possuem buracos.

// Deste modo podemos considerar que o número de buracos em um texto é igual a soma dos buracos nas palavras dele.

// A sua tarefa é, dado um texto qualquer, encontre a quantidade de buracos nele.

let one = ['A', 'D', 'O', 'P', 'Q', 'R', 'a','b','d','e','g','o','p','q','u']
let two = ['B']
let not = ['C', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'S', 'T', 'U', 'V', 'X', 'Y', 'W', 'Z', 'c','f','h','i','j','k','l','m','n','r','s','t','v','x','y','w','z']

function call(txt) {
    return txt.split('')
        .reduce((acc, val, i, arr) => {

            let fOne = one.findIndex((el) => { return el == val })
            if( fOne !== -1 ) return ++acc 
            let fTwo = two.findIndex((el) => { return el == val })
            if( fTwo !== -1 ) return acc +2
            return acc;

        }, 0)
}

let a = call("mafagafo B a B o O")
console.log( 'final', a )
