// App.tsx
import { useEffect, useRef } from 'react';
import { useBluetooth } from './useBluetooth';
import * as SRVisualizer from 'sr-visualizer';
import Timer from './Timer';

const App = () => {
  const { cubeState, connect } = useBluetooth();

  const timerRef = useRef<{ start: () => void; stop: () => void }>(null);


  useEffect(() => {
    const imgContainer = document.querySelector('#imageContainer') as HTMLDivElement;
    if (imgContainer) {
      imgContainer.innerHTML = '';
      console.log('cubeState', cubeState);
      if (cubeState === 'bbbbbbbbboooooooooyyyyyyyyygggggggggrrrrrrrrrwwwwwwwww') {
        timerRef.current?.stop();
      }
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
      <div>
        <Timer ref={timerRef} />
        <button onClick={() => timerRef.current?.start()}>Start</button>
        <button onClick={() => timerRef.current?.stop()}>Stop</button>
      </div>
    </div>
  );
};

export default App;
