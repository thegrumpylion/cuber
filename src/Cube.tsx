import { FC, useEffect, useRef, useState } from 'react'
import { Axis, cubeSVG } from 'sr-visualizer';
import { useDrag, DragPreview } from 'react-aria';

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

const columnTransformReverse = (state: string[]): string[] => {
  const out = Array(9).fill('');
  const indexes = [2, 5, 8, 1, 4, 7, 0, 3, 6];
  for (let i = 0; i < 9; i++) {
    out[i] = state[indexes[i]];
  }
  // out.reverse();
  return out
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
    t: columnTransformReverse
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

  const [rotX, setRotX] = useState(-30);
  const [rotY, setRotY] = useState(35);

  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  const [interimX, setInterimX] = useState(0);
  const [interimY, setInterimY] = useState(0);

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
          viewportRotations: [
            [Axis.Y, rotY],
            [Axis.X, rotX],
          ],
        }
      );
    }
  }, [state, planView, rotX, rotY])

  const preview = useRef(null);

  const { dragProps } = useDrag({
    getItems() {
      return [{
        'text/plain': ''
      }];
    },
    onDragStart(e) {
      console.log("onDragStart", e);
      setInitialX(e.x);
      setInitialY(e.y);
      setInterimX(e.x);
      setInterimY(e.y);
    },
    onDragMove: (e) => {
      // clamp y rotation to -360 and 360
      setRotY(Math.min(360, Math.max(-360, rotY - (e.x - interimX) / 5)));
      // clamp x rotation to -90 and 90
      setRotX(Math.min(90, Math.max(-90, rotX - (e.y - interimY) / 5)));
      setInterimX(e.x);
      setInterimY(e.y);
    },
    onDragEnd(e) {
      setRotY(Math.min(360, Math.max(-360, rotY - (e.x - initialX) / 5)));
      setRotX(Math.min(90, Math.max(-90, rotX - (e.y - initialY) / 5)));
    },
    preview,
  });

  return (
    <>
      <div {...dragProps} ref={imgContainer}></div>
      <DragPreview ref={preview}>
        {() => (
          <div></div>
        )}
      </DragPreview>
    </>
  );
}


export default Cube;
