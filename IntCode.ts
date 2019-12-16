interface Instruction {
  opCode: OpCode;
  mode1: ParameterMode;
  mode2: ParameterMode;
  mode3: ParameterMode;
}

interface InstructionSet {
  instruction: Instruction;
  args: number[];
}

enum ParameterMode {
  position = "0",
  immediate = "1"
}

enum OpCode {
  add = 1,
  multiply = 2,
  saveInput = 3,
  output = 4,
  jumpIfTrue = 5,
  jumpIfFalse = 6,
  lessThan = 7,
  equals = 8,
  terminate = 99
}

export class IntCode {
  instructions: number[] = [];
  pointer = 0;
  inputPointer = 0;
  output?: number;

  constructor(private data: string) {
    this.reset();
  }

  run(input: number[]): number | undefined | false {
    while (this.pointer < this.instructions.length) {
      const result = this.runInstruction(input);
      if (result === false) {
        return false;
      }
    }
    return this.output;
  }

  reset() {
    this.instructions = this.data.split(",").map(x => parseInt(x));
    this.pointer = 0;
    this.inputPointer = 0;
    this.output = undefined;
  }

  runInstruction(input: number[]) {
    const instruction = this.getInstruction();
    const firstVal = this.getParamValue(1, instruction.mode1);
    const secondVal = this.getParamValue(2, instruction.mode2);

    switch (instruction.opCode) {
      case OpCode.add:
        var outputPos = this.getParamValue(3, ParameterMode.immediate);

        this.instructions[outputPos] = firstVal + secondVal;
        this.pointer += 4;
        break;
      case OpCode.multiply:
        var outputPos = this.getParamValue(3, ParameterMode.immediate);

        this.instructions[outputPos] = firstVal * secondVal;
        this.pointer += 4;
        break;
      case OpCode.saveInput:
        var outputPos = this.getParamValue(1, ParameterMode.immediate);
        this.instructions[outputPos] = input[this.inputPointer];
        this.inputPointer += 1;
        this.pointer += 2;
        break;
      case OpCode.output:
        var outputValue = (this.output = this.getParamValue(
          1,
          instruction.mode1
        ));
        this.pointer += 2;
        break;
      case OpCode.jumpIfTrue:
        if (firstVal !== 0) {
          this.pointer = secondVal;
        } else {
          this.pointer += 3;
        }
        break;
      case OpCode.jumpIfFalse:
        if (firstVal === 0) {
          this.pointer = secondVal;
        } else {
          this.pointer += 3;
        }
        break;
      case OpCode.lessThan:
        var outputPos = this.getParamValue(3, ParameterMode.immediate);
        this.instructions[outputPos] = firstVal < secondVal ? 1 : 0;
        this.pointer += 4;
        break;
      case OpCode.equals:
        var outputPos = this.getParamValue(3, ParameterMode.immediate);
        this.instructions[outputPos] = firstVal === secondVal ? 1 : 0;
        this.pointer += 4;
        break;
      case OpCode.terminate:
        return false;
      default:
        throw new Error(
          `Something went wrong, code found: ${instruction.opCode}.`
        );
    }
  }

  get currentItem(): number {
    return this.instructions[this.pointer];
  }

  getInstruction(): Instruction {
    const stringVal = this.currentItem.toString();
    return {
      opCode: parseInt(stringVal.slice(-2), 10) as OpCode,
      mode1:
        (stringVal.slice(-3, -2) as ParameterMode) || ParameterMode.position,
      mode2:
        (stringVal.slice(-4, -3) as ParameterMode) || ParameterMode.position,
      mode3:
        (stringVal.slice(-5, -4) as ParameterMode) || ParameterMode.position
    };
  }

  getParamValue(i: number, mode: ParameterMode): number {
    const param = this.instructions[this.pointer + i];
    switch (mode) {
      case ParameterMode.immediate:
        return param;
      case ParameterMode.position:
      default:
        return this.instructions[param];
    }
  }
}
