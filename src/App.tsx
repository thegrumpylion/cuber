// App.tsx
import { useEffect, useRef, useState } from 'react';
import { useBluetooth } from './useBluetooth';
import * as SRVisualizer from 'sr-visualizer';
import { useTimer } from './useTimer'
import { StateMachine, states } from './statemachine';

const App = () => {

  const { cubeState, connect } = useBluetooth();

  const [stateMachine] = useState(new StateMachine(states));

  const { time, events, start, stop, recordEvent, formatTime } = useTimer();


  useEffect(() => {
    const imgContainer = document.querySelector('#imageContainer') as HTMLDivElement;
    if (imgContainer) {
      imgContainer.innerHTML = '';
      if (stateMachine.process(cubeState)) {
        if (stateMachine.isComplete()) {
          console.log('Cube is complete');
          stop()
          stateMachine.reset()
          return
        }
        console.log('entering state:', stateMachine.getCurrentStateName());
        recordEvent(stateMachine.getCurrentStateName())
      }
      SRVisualizer.cubeSVG(
        imgContainer,
        `visualcube.php?fmt=svg&r=x-90y-120x-20&size=300&fc=${cubeState}`
      );
    }
  }, [cubeState, stateMachine])

  return (
    <div className="App">
      <div>
        <div id="imageContainer"></div>
        <button onClick={connect}>Connect</button>
      </div>
      <div>
        <div>Timer: {formatTime(time)}</div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <div>
          {events.map((event, index) => (
            <div key={index}>
              {event.description}: {formatTime(event.time)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
