interface State {
  name: string;
  positions: Map<number, string>;
}

export class StateMachine {
  private states: State[];
  private currentStateIndex: number;

  constructor(states: State[]) {
    this.states = states;
    this.currentStateIndex = 0;
  }

  private checkState(inputString: string[], state: State): boolean {
    for (const [pos, expectedChar] of state.positions) {
      if (inputString[pos] !== expectedChar) {
        return false;
      }
    }
    return true;
  }

  public process(inputChar: string[]): boolean {
    if (this.currentStateIndex < this.states.length) {
      const state = this.states[this.currentStateIndex];
      if (this.checkState(inputChar, state)) {
        this.currentStateIndex++;
        return true;
      }
    }
    return false;
  }

  public reset(): void {
    this.currentStateIndex = 0;
  }

  public isComplete(): boolean {
    return this.currentStateIndex >= this.states.length;
  }

  public getCurrentStateName(): string {
    return this.states[this.currentStateIndex].name;
  }
}


// back = green, up = yellow, right = red, down = white, left = orange, front = blue
export const states: State[] = [
  {
    name: 'cross',
    positions: new Map([
      [46, 'd'], [48, 'd'], [49, 'd'], [50, 'd'], [52, 'd']
    ])
  },
  {
    name: 'f2l',
    positions: new Map([
      [0, 'f'], [1, 'f'], [2, 'f'], [3, 'f'], [4, 'f'], [5, 'f'],
      [10, 'l'], [11, 'l'], [13, 'l'], [14, 'l'], [16, 'l'], [17, 'l'],
      [30, 'b'], [31, 'b'], [32, 'b'], [33, 'b'], [34, 'b'], [35, 'b'],
      [36, 'r'], [37, 'r'], [39, 'r'], [40, 'r'], [42, 'r'], [43, 'r'],
      [45, 'd'], [46, 'd'], [47, 'd'], [48, 'd'], [49, 'd'], [50, 'd'], [51, 'd'], [52, 'd'], [53, 'd'],
    ])
  },
  {
    name: 'oll',
    positions: new Map([
      [0, 'f'], [1, 'f'], [2, 'f'], [3, 'f'], [4, 'f'], [5, 'f'],
      [10, 'l'], [11, 'l'], [13, 'l'], [14, 'l'], [16, 'l'], [17, 'l'],
      [18, 'u'], [19, 'u'], [20, 'u'], [21, 'u'], [22, 'u'], [23, 'u'], [24, 'u'], [25, 'u'], [26, 'u'],
      [30, 'b'], [31, 'b'], [32, 'b'], [33, 'b'], [34, 'b'], [35, 'b'],
      [36, 'r'], [37, 'r'], [39, 'r'], [40, 'r'], [42, 'r'], [43, 'r'],
      [45, 'd'], [46, 'd'], [47, 'd'], [48, 'd'], [49, 'd'], [50, 'd'], [51, 'd'], [52, 'd'], [53, 'd'],
    ])
  },
  {
    name: 'pll',
    positions: new Map([
      [0, 'f'], [1, 'f'], [2, 'f'], [3, 'f'], [4, 'f'], [5, 'f'], [6, 'f'], [7, 'f'], [8, 'f'],
      [9, 'l'], [10, 'l'], [11, 'l'], [12, 'l'], [13, 'l'], [14, 'l'], [15, 'l'], [16, 'l'], [17, 'l'],
      [18, 'u'], [19, 'u'], [20, 'u'], [21, 'u'], [22, 'u'], [23, 'u'], [24, 'u'], [25, 'u'], [26, 'u'],
      [27, 'b'], [28, 'b'], [29, 'b'], [30, 'b'], [31, 'b'], [32, 'b'], [33, 'b'], [34, 'b'], [35, 'b'],
      [36, 'r'], [37, 'r'], [38, 'r'], [39, 'r'], [40, 'r'], [41, 'r'], [42, 'r'], [43, 'r'], [44, 'r'],
      [45, 'd'], [46, 'd'], [47, 'd'], [48, 'd'], [49, 'd'], [50, 'd'], [51, 'd'], [52, 'd'], [53, 'd'],
    ])
  }
];

