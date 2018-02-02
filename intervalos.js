// Dado uma lista de números inteiros, agrupe a lista em um conjunto de intervalos
//
// Exemplo:
//
// Entrada: 100, 101, 102, 103, 104, 105, 110, 111, 113, 114, 115, 150
//
// Saída: [100-105], [110-111], [113-115], [150]


let core = [100, 101, 102, 103, 104, 105, 110, 111, 113, 114, 115, 150]


function problema(array, res = [] ){

    return array.sort().reduce( (acc, v, i , arr) => {

        if( acc.length > 0 && acc[acc.length-1]+1 !== v ){
            let n = acc.splice(0, acc.length)
            res.push([n[0]+"-"+n[n.length-1]])
        }
        acc.push( v )

        return acc
    },[]).concat(res).sort()

    // return res
}
console.log( 'result:', problema( core ) );
