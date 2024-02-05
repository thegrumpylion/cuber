// App.tsx
import React from 'react';
import { useBluetooth } from './useBluetooth';
import * as SRVisualizer from 'sr-visualizer';

const App = () => {
  const { cubeState, connect } = useBluetooth();

  React.useEffect(() => {
    const imgContainer = document.querySelector('#imageContainer') as HTMLDivElement;
    if (imgContainer) {
      imgContainer.innerHTML = '';
      SRVisualizer.cubeSVG(
        imgContainer,
        `visualcube.php?fmt=svg&r=x-90y-120x-20&size=300&fc=${cubeState}`
      );
    }
  }, [cubeState]);

  return (
    <div className="App">
      <div>
        <div id="imageContainer"></div>
        <button onClick={connect}>Connect</button>
      </div>
    </div>
  );
};

export default App;
