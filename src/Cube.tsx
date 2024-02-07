import { FC, useEffect, useRef } from 'react'
import * as SRVisualizer from 'sr-visualizer';

interface CubeProps {
  state: string[]
}

const Cube: FC<CubeProps> = ({ state }) => {

  const imgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (imgContainer.current) {
      imgContainer.current.innerHTML = '';
      SRVisualizer.cubeSVG(
        imgContainer.current,
        {
          facelets: state,
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

export default Cube;
