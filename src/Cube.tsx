import { FC, useEffect, useRef } from 'react'
import { Axis, cubeSVG } from 'sr-visualizer';

interface CubeProps {
  state: string[]
}

const state = [
  'f', 'f', 'f', 'f', 'f', 'f', 'l', 'l', 'l',
  'b', 'l', 'l', 'b', 'l', 'l', 'b', 'l', 'l',
  'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u',
  'r', 'r', 'r', 'b', 'b', 'b', 'b', 'b', 'b',
  'r', 'r', 'f', 'r', 'r', 'f', 'r', 'r', 'f',
  'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd'
]
const mapped = [
  'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u',
  'r', 'r', 'r', 'r', 'r', 'r', 'f', 'f', 'f',
  'l', 'l', 'l', 'f', 'f', 'f', 'f', 'f', 'f',
  'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd', 'd',
  'l', 'l', 'l', 'l', 'l', 'l', 'b', 'b', 'b',
  'r', 'r', 'r', 'b', 'b', 'b', 'b', 'b', 'b'
]

const reverseTransform = (): ((state: string[]) => string[]) => {
  return (state: string[]): string[] => {
    return state.reverse();
  }
}

const columnTransform = (reverse: boolean): ((state: string[]) => string[]) => {
  return (state: string[]): string[] => {
    const out = Array(9).fill('');
    const indexes = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    for (let i = 0; i < 9; i++) {
      out[i] = state[indexes[i]];
    }
    console.log("columnTransform state", out);
    if (reverse) {
      console.log("columnTransform reverse", out.reverse());
      return out.reverse();
    }
    console.log("columnTransform out", out);
    return out;
  }
}


const xiomiMappings: Record<number, { f: number, t: (state: string[]) => string[] }> = {
  0: {
    f: 2, // reverse
    t: reverseTransform(),
  },
  1: {
    f: 4, // 3,6,9 2,5,8 1,4,7
    t: columnTransform(true)
  },
  2: {
    f: 0, // reverse
    t: reverseTransform(),
  },
  3: {
    f: 5, // no transformation
    t: (state: string[]): string[] => state
  },
  4: {
    f: 1, // 7,4,1 8,5,2 9,6,3
    t: columnTransform(true)
  },
  5: {
    f: 3, // no transformation
    t: (state: string[]): string[] => state
  },
}

const xiaomiMapper = (state: string[]): string[] => {
  const out = Array(54).fill('');
  for (let i = 0; i < 6; i++) {
    const mapping = xiomiMappings[i];
    const face = state.slice(i * 9, (i + 1) * 9);
    const transformed = mapping.t(face);
    for (let j = 0; j < 9; j++) {
      out[mapping.f * 9 + j] = transformed[j];
    }
  }
  return out;
}


const Cube: FC<CubeProps> = ({ state }) => {

  const imgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgContainer.current) {
      imgContainer.current.innerHTML = '';
      console.log("state", state);
      console.log("mapped", xiaomiMapper(state));
      cubeSVG(
        imgContainer.current,
        {
          facelets: xiaomiMapper(state),
          // viewportRotations: [
          //   [Axis.X, 0],
          //   [Axis.Y, 130],
          //   [Axis.Z, 0],
          // ],
        }
      );
    }
  }, [state])

  return (
    <div ref={imgContainer}></div>
  );
}


export default Cube;
