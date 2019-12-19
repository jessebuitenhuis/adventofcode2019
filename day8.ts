import input from './day8input';

const width = 25;
const height = 6;


enum Color {
    black = "0",
    white = "1",
    transparent = "2"
}

solvePuzzle();

function solvePuzzle() {
    const layers = mapToLayers(input, width*height);
    const bestLayer = getBestLayer(layers);

    console.log(layers, bestLayer);

    const countOnes = countDigits(bestLayer, 1);
    const countTwos = countDigits(bestLayer, 2);

    const image = decode(input, width, height);
    render(image, width, height);
}


function decode(input: string, width: number, height: number) {
    const layers = mapToLayers(input, width*height);
    let image = "";

    for (var i = 0; i < width*height; i++) {
        image += calcPixel(layers, i);
    }

    return image;
}

function render(image: string, width: number, height: number) {
    let i = 0;

    for (var y = 0; y < height; y++) {
        let row = "";
        for (var x = 0; x < width; x++) {
            row += image[i] === Color.black ? ' ' : '*';
            i++;
        }
        console.log(row);
    }
}

function calcPixel(layers: string[], j: number): Color {
    for (let i = 0; i < layers.length; i++) {
        const pixel = layers[i][j] as Color;
        if (pixel === Color.transparent) {
            continue;
        }
        return pixel;
    }
    return Color.transparent;
}

function getBestLayer(layers: string[]): string {
    let min;
    let best = "";

    for (var i = 0; i < layers.length; i++) {
        const count = countDigits(layers[i], 0);
        if (!min || count < min) {
            min = count;
            best = layers[i];
        }
    }

    return best;
}

function mapToLayers(input: string, layerLength: number): string[] {
    const output = [];
    const layerCount = Math.floor(input.length / layerLength);

    for (let i = 0; i < layerCount; i++) {
        const start = i*layerLength;
        const end = (i+1)*layerLength;
        const layer = input.slice(start, end);
        output.push(layer);
    }

    return output;
}

function countDigits(layer: string, digit: number): number {
    const regex = new RegExp(digit.toString(), "g")
    const matches = layer.match(regex);
    return matches && matches.length || 0;
}

