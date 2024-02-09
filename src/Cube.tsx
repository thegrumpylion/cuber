import { FC, useEffect, useRef } from 'react'
import { cubeSVG } from 'sr-visualizer';

interface CubeProps {
  state: string[]
  planView?: boolean
}

const reverseTransform = (state: string[]): string[] => {
  return state.reverse();
}


const columnTransform = (state: string[]): string[] => {
  const out = Array(9).fill('');
  const indexes = [2, 5, 8, 1, 4, 7, 0, 3, 6];
  for (let i = 0; i < 9; i++) {
    out[i] = state[indexes[i]];
  }
  return out;
}

const xiomiMappings: Record<number, { f: number, t: (state: string[]) => string[] }> = {
  0: {
    f: 2, // reverse
    t: reverseTransform,
  },
  1: {
    f: 4, // 3,6,9,2,5,8,1,4,7
    t: columnTransform
  },
  2: {
    f: 0, // reverse
    t: reverseTransform,
  },
  3: {
    f: 5, // no transformation
    t: (state: string[]): string[] => state
  },
  4: {
    f: 1, // 3,6,9,2,5,8,1,4,7
    t: columnTransform
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


const Cube: FC<CubeProps> = ({ state, planView }) => {

  const imgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgContainer.current) {
      imgContainer.current.innerHTML = '';
      cubeSVG(
        imgContainer.current,
        {
          facelets: xiaomiMapper(state),
          view: planView ? 'plan' : undefined,
          height: 300,
          width: 300,
        }
      );
    }
  }, [state, planView])

  return (
    <div ref={imgContainer}></div>
  );
}


export default Cube;
