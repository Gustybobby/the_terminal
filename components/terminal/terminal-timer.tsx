import React from "react";
import { useTimer } from "react-timer-hook";
import { Button } from "../ui/button";

function MyTimer({ expiryTimestamp }: { expiryTimestamp: Date }) {
  const {
    totalSeconds,
    seconds,
    minutes,

    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="flex flex-row text-center border border-2 border-black rounded-lg p-2">
      <div className="text-6xl">
        <span>{minutes < 10 ? `0${minutes}` : `${minutes}`}</span>:
        <span>{seconds < 10 ? `0${seconds}` : `${seconds}`}</span>
      </div>
      {/* <p>{isRunning ? 'Running' : 'Not running'}</p> */}
      <div className="flex flex-col justify-between">
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={resume}>Resume</Button>
        <Button
          onClick={() => {
            // Restarts to 5 minutes timer
            const time = new Date();
            time.setSeconds(time.getSeconds() + 300);
            restart(time, false);
          }}
        >
          Restart
        </Button>
      </div>
    </div>
  );
}

export default function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  return (
    <div className="h-full">
      <MyTimer expiryTimestamp={time} />
    </div>
  );
}
