const getNextKey = (key) => {
    if (key === 'Z' || key === 'z') {
        return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25); // AA or aa
    } else {
        const lastChar = key.slice(-1);
        const sub = key.slice(0, -1);
        if (lastChar === 'Z' || lastChar === 'z') {
            return getNextKey(sub) + String.fromCharCode(lastChar.charCodeAt() - 25);
        } else {
            return sub + String.fromCharCode(lastChar.charCodeAt() + 1);
        }
    }
};

const buildCanvas = (nodesXX, nodesYY) => {
    let letter = 'A';
    const nodes = []
    for (const x in nodesXX) {
        for (const y in nodesYY) {
            nodes.push({ x, y, letter })
            letter = getNextKey(letter);
        }
    }
    return nodes;
}


const nodes = [3, 3];

const nodeX = Array.from({ length: nodes[0] });
const nodeY = Array.from({ length: nodes[1] });

const canvas = buildCanvas(nodeX, nodeY);

const departure = [0, 0];
const arrival = [2, 2];
const walls = [[0, 2], [1, 0]];


const filterNextRoute = (n, node) => (n.x == node.x && n.y == parseFloat(node.y) + 1 || n.x == parseFloat(node.x) + 1 && n.y == parseFloat(node.y) + 1 || n.x == parseFloat(node.x) + 1 && n.y == node.y);
const partida = (departure, node) => node.x == departure[0] && node.y == departure[1];

const generateSteps = (node, nodeFilter, acc, score, oldFilter) => {

    const arroldFilter = oldFilter.map(cur => `${cur.x}-${cur.y}`);

    nodeFilter = nodeFilter.filter(cur => !arroldFilter.includes(`${cur.x}-${cur.y}`));

    let newScore = score + 10;

    if (!acc.steps) acc = Object.assign({ score }, node, { steps: [] });

    for (const n of nodeFilter) {


        const found = n.x == arrival[0] && n.y == arrival[1];
        if (found) {
            newScore = score + 1;
            n.found = found;
        }

        if (n.x == n.y && !found) newScore = score + 5;


        const nCurrent = Object.assign({ score: newScore }, n, { steps: [] });
        acc.steps.push(nCurrent);

        if (found) return acc;

        for (const node of canvas) {
            if (partida([n.x, n.y], node)) {
                const nf = canvas.filter(cur => filterNextRoute(cur, node))
                generateSteps(n, nf, nCurrent, newScore, nodeFilter);
            }
        }
    }

    return acc;
}



let routes;
for (const node of canvas) {
    if (partida(departure, node)) {
        const nodeFilter = canvas.filter(cur => filterNextRoute(cur, node));
        routes = generateSteps(node, nodeFilter, {}, 0, []);
    }
}


let temp = [];


v = [];

if (routes.steps[0].steps.length) {
    for (const s of routes.steps[0].steps) {

        if (s.steps.length) {

            for (const ss of s.steps) {

                if (ss.steps.length) {

                } else {

                    v.push(routes.letter)
                    v.push(routes.steps[0].letter)
                    v.push(s.letter)
                    v.push(ss.letter)
                    temp.push(v);

                    v = [];
                }
            }

        } else {

            v.push(routes.letter)
            v.push(routes.steps[0].letter)
            v.push(s.letter)
            temp.push(v);

            v = [];
        }


    }
} else {
    v.push(routes.steps[0].letter)
}

temp.push(v);


// let steps = routes.steps.reduce((acc, cur) => {
//     console.log(cur.steps);
//     // acc.push(cur.steps.reduce((accc, curr) => {

//     //     accc.push(curr.letter)

//     //     return accc;
//     // }, [routes.letter]));

//     return acc;
// }, []);

// console.log(steps);
console.log(temp);

