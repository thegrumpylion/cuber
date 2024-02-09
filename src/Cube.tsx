import { FC, useEffect, useRef } from 'react'
import { cubeSVG, Face } from 'sr-visualizer';

interface CubeProps {
  state: string[]
}

const Cube: FC<CubeProps> = ({ state }) => {

  const imgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgContainer.current) {
      imgContainer.current.innerHTML = '';
      cubeSVG(
        imgContainer.current,
        {
          // facelets: mapper(state),
          facelets: [
            "u", "u", "u", "u", "u", "u", "u", "u", "u",
            "u", "r", "r", "r", "r", "r", "r", "r", "r",
            "f", "f", "f", "f", "f", "f", "f", "f", "f",
            "d", "d", "d", "d", "d", "d", "d", "d", "d",
            "l", "l", "l", "l", "l", "l", "l", "l", "l",
            "b", "b", "b", "b", "b", "b", "b", "b", "b"]
        }
      );
    }
  }, [state])

  return (
    <div>
      <div ref={imgContainer}></div>
    </div>
  );
}

// default: U -> yellow, R -> red, F -> blue, D-> white, L -> orange, B -> green
// xiaomi : U -> blue, R -> orange, F -> yellow, D -> green, L -> red, B -> white
const xiaomiMapper: Record<Face, { face: Face, reverse: boolean }> = {
  [Face.U]: { face: Face.F, reverse: false },
  [Face.R]: { face: Face.L, reverse: true },
  [Face.F]: { face: Face.U, reverse: true },
  [Face.D]: { face: Face.B, reverse: false },
  [Face.L]: { face: Face.R, reverse: true },
  [Face.B]: { face: Face.D, reverse: true }
}

const mapper = (state: string[]): string[] => {
  const out = Array(54).fill('x');
  // loop Face enum
  for (let i = 0; i < 6; i++) {
    const face = i as Face;
    const { face: newFace, reverse } = xiaomiMapper[face];
    // loop facelets
    for (let j = 0; j < 9; j++) {
      const oldIndex = face * 9 + j;
      const newIndex = newFace * 9 + (reverse ? 8 - j : j);
      out[newIndex] = state[oldIndex];
    }
  }
  return out;
}

export default Cube;
