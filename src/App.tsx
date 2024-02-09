// App.tsx
import { useEffect, useState } from 'react';
import { useBluetooth } from './useBluetooth';
import { useTimer } from './useTimer'
import { StateMachine, states } from './statemachine';
import Cube from './Cube';

const App = () => {

  const { cubeState, connect } = useBluetooth();

  const [stateMachine] = useState(new StateMachine(states));
  const [planView, setPlanView] = useState(false)

  const { time, events, start, stop, recordEvent, formatTime } = useTimer();

  const reset = () => {
    stop()
    stateMachine.reset()
  }

  useEffect(() => {
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
  }, [stateMachine, cubeState, recordEvent, stop])

  return (
    <div className="App">
      <div>
        <Cube state={cubeState} planView={planView} />
        <button onClick={connect}>Connect</button>
        <button onClick={() => setPlanView(!planView)}>Toggle Plan View</button>
      </div>
      <div>
        <div>Timer: {formatTime(time)}</div>
        <button onClick={start}>Start</button>
        <button onClick={reset}>Stop</button>
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
