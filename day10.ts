const input = `#...##.####.#.......#.##..##.#.
#.##.#..#..#...##..##.##.#.....
#..#####.#......#..#....#.###.#
...#.#.#...#..#.....#..#..#.#..
.#.....##..#...#..#.#...##.....
##.....#..........##..#......##
.##..##.#.#....##..##.......#..
#.##.##....###..#...##...##....
##.#.#............##..#...##..#
###..##.###.....#.##...####....
...##..#...##...##..#.#..#...#.
..#.#.##.#.#.#####.#....####.#.
#......###.##....#...#...#...##
.....#...#.#.#.#....#...#......
#..#.#.#..#....#..#...#..#..##.
#.....#..##.....#...###..#..#.#
.....####.#..#...##..#..#..#..#
..#.....#.#........#.#.##..####
.#.....##..#.##.....#...###....
###.###....#..#..#.....#####...
#..##.##..##.#.#....#.#......#.
.#....#.##..#.#.#.......##.....
##.##...#...#....###.#....#....
.....#.######.#.#..#..#.#.....#
.#..#.##.#....#.##..#.#...##..#
.##.###..#..#..#.###...#####.#.
#...#...........#.....#.......#
#....##.#.#..##...#..####...#..
#.####......#####.....#.##..#..
.#...#....#...##..##.#.#......#
#..###.....##.#.......#.##...##`;

type Coord = [number, number];
type Astroid = [number, number];

solvePuzzle();

function solvePuzzle() {
    const astroids = mapToAstroids(input);
    const maxAstroid = findMaxAstroidCount(astroids);

    console.log('Best location: ', maxAstroid);
    
}

function solvePuzzle2() {
    const astroids = mapToAstroids(input);

}

function findMaxAstroidCount(astroids: Coord[]): number {
    return astroids.reduce((max, a) => {
        const count = countAstroidsInSight(astroids, a);
        if (count > max) {
            console.log(`Best: ${a}`);
        }
        return Math.max(max, count);

    }, 0)

}

function countAstroidsInSight(astroids: Coord[], astroid: Astroid): number {
    const otherAstroids = astroids.filter(x => x !== astroid);
    const angles = otherAstroids.map(x => findAngle(astroid, x));
    const uniqueAngles = dedupe(angles);
    return uniqueAngles.length;
}

function dedupe<T>(arr: T[]): T[] {
    return arr.filter((x, i) => arr.indexOf(x) === i);
}

function findAngle(start: Coord, end: Coord): number {
    return Math.atan2(end[1] - start[1], end[0] - start[0]) * 180 / Math.PI;
}

function mapToAstroids(input: string): Astroid[] {
    const lines = input.split('\n');
    const astroids: Astroid[] = [];
    
    lines.forEach((line, y) => {
        for (var x = 0; x < line.length; x++) {
            const item = line[x];
            if (item === '#') {
                astroids.push([x, y]);
            }
        }
    })

    return astroids;
}
