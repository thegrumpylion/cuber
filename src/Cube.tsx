import { FC, useEffect, useRef } from 'react'
import * as SRVisualizer from 'sr-visualizer';

interface CubeProps {
  state: string[]
}

const Cube: FC<CubeProps> = ({ state }) => {

  const imgContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('state:', state);
    if (imgContainer.current) {
      imgContainer.current.innerHTML = '';
      SRVisualizer.cubeSVG(
        imgContainer.current,
        //        `visualcube.php?fmt=svg&r=x-90y-120x-20&size=300&fc=${state}`
        {
          facelets: state
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
