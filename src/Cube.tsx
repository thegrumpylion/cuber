import { FC, useEffect } from 'react'
import * as SRVisualizer from 'sr-visualizer';

interface CubeProps {
  state: string
}

const Cube: FC<CubeProps> = ({ state }) => {

  useEffect(() => {
    const imgContainer = document.querySelector('#imageContainer') as HTMLDivElement;
    if (imgContainer) {
      imgContainer.innerHTML = '';
      SRVisualizer.cubeSVG(
        imgContainer,
        `visualcube.php?fmt=svg&r=x-90y-120x-20&size=300&fc=${state}`
      );
    }
  }, [state])

  return (
    <div>
      <div id="imageContainer"></div>
    </div>
  );
}

export default Cube;
