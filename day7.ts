import { IntCode } from "./IntCode";

const input = `3,8,1001,8,10,8,105,1,0,0,21,42,67,84,109,122,203,284,365,446,99999,3,9,1002,9,3,9,1001,9,5,9,102,4,9,9,1001,9,3,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,1001,9,4,9,102,3,9,9,101,3,9,9,4,9,99,3,9,101,5,9,9,1002,9,3,9,101,5,9,9,4,9,99,3,9,102,5,9,9,101,5,9,9,102,3,9,9,101,3,9,9,102,2,9,9,4,9,99,3,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,99
`;

const options = [0, 1, 2, 3, 4];
const settings = permute(options);
const amps = options.map(() => new IntCode(input));

console.log("Puzzle 1: ", getMax(settings));

function getMax(_settings: number[][]): number {
  let max = 0;

  for (var i = 0; i < _settings.length; i++) {
    const output = runProgram(_settings[i]);
    max = Math.max(output, max);
  }

  return max;
}

// function runFeedbackLoop(_settings: number[]): number {
//   let output = 0;

//   while (true) {
//     output += runProgram(_settings, output);
//   }
// }

function runProgram(_settings: number[], start: number = 0): number {
  let input = 0;
  let outputE = 0;

  for (var i = 0; i <= _settings.length; i++) {
    const amp = amps[i];
    const setting = _settings[i];
    const output = amp.run([setting, input]);

    // if (i === 4 && output !== false) {
    //   outputE = output || 0;
    // }

    // if (output === false) {
    //   return outputE;
    // }
  }

  return input;
}

function permute<T>(input: T[]) {
  const result: T[][] = [];

  const _permute = (unusedChars: T[], mutation: T[] = []) => {
    if (unusedChars.length === 0) {
      result.push(mutation);
    } else {
      for (let i = 0; i < unusedChars.length; i++) {
        const _unusedChars = unusedChars.slice();
        const next = _unusedChars.splice(i, 1);
        _permute(_unusedChars.slice(), mutation.concat(next));
      }
    }
  };

  _permute(input);

  return result;
}
