interface State {
  name: string;
  positions: Map<number, string>;
}

class StateMachine {
  private states: State[];
  private currentStateIndex: number;

  constructor(states: State[]) {
    this.states = states;
    this.currentStateIndex = 0;
  }

  private checkState(inputString: string, state: State): boolean {
    for (const [pos, expectedChar] of state.positions) {
      if (inputString.charAt(pos) !== expectedChar) {
        return false;
      }
    }
    return true;
  }

  public process(inputChar: string): boolean {
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

const states: State[] = [
  {
    name: 'cross',
    positions: new Map([
      [46, 'w'], [48, 'w'], [49, 'w'], [50, 'w'], [52, 'w']
    ])
  },
  {
    name: 'f2l',
    positions: new Map([
      [0, 'b'], [1, 'b'], [2, 'b'], [3, 'b'], [4, 'b'], [5, 'b'],
      [10, 'o'], [11, 'o'], [13, 'o'], [14, 'o'], [16, 'o'], [17, 'o'],
      [30, 'g'], [31, 'g'], [32, 'g'], [33, 'g'], [34, 'g'], [35, 'g'],
      [36, 'r'], [37, 'r'], [39, 'r'], [40, 'r'], [42, 'r'], [43, 'r'],
      [45, 'w'], [46, 'w'], [47, 'w'], [48, 'w'], [49, 'w'], [50, 'w'], [51, 'w'], [52, 'w'], [53, 'w'],
    ])
  },
  {
    name: 'oll',
    positions: new Map([
      [0, 'b'], [1, 'b'], [2, 'b'], [3, 'b'], [4, 'b'], [5, 'b'],
      [10, 'o'], [11, 'o'], [13, 'o'], [14, 'o'], [16, 'o'], [17, 'o'],
      [18, 'y'], [19, 'y'], [20, 'y'], [21, 'y'], [22, 'y'], [23, 'y'], [24, 'y'], [25, 'y'], [26, 'y'],
      [30, 'g'], [31, 'g'], [32, 'g'], [33, 'g'], [34, 'g'], [35, 'g'],
      [36, 'r'], [37, 'r'], [39, 'r'], [40, 'r'], [42, 'r'], [43, 'r'],
      [45, 'w'], [46, 'w'], [47, 'w'], [48, 'w'], [49, 'w'], [50, 'w'], [51, 'w'], [52, 'w'], [53, 'w'],
    ])
  },
  {
    name: 'pll',
    positions: new Map([
      [0, 'b'], [1, 'b'], [2, 'b'], [3, 'b'], [4, 'b'], [5, 'b'], [6, 'b'], [7, 'b'], [8, 'b'],
      [9, 'o'], [10, 'o'], [11, 'o'], [12, 'o'], [13, 'o'], [14, 'o'], [15, 'o'], [16, 'o'], [17, 'o'],
      [18, 'y'], [19, 'y'], [20, 'y'], [21, 'y'], [22, 'y'], [23, 'y'], [24, 'y'], [25, 'y'], [26, 'y'],
      [27, 'g'], [28, 'g'], [29, 'g'], [30, 'g'], [31, 'g'], [32, 'g'], [33, 'g'], [34, 'g'], [35, 'g'],
      [36, 'r'], [37, 'r'], [38, 'r'], [39, 'r'], [40, 'r'], [41, 'r'], [42, 'r'], [43, 'r'], [44, 'r'],
      [45, 'w'], [46, 'w'], [47, 'w'], [48, 'w'], [49, 'w'], [50, 'w'], [51, 'w'], [52, 'w'], [53, 'w'],
    ])
  }
];

