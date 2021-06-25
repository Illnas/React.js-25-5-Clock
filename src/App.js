import { useState, useEffect } from "react";

function App() {
  const [breakLength, setBreakLength] = useState(5);
  const [session, setSession] = useState(25);
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [timer, setTimer] = useState(null);
  const [change, setChange] = useState("Session");

  useEffect(() => {
    if (timer) {
      let interval = null;
      interval = setInterval(() => {
        handleNumber();
      }, 1000);
      return () => {
        clearInterval(interval);
      };
    }
  });

  const handleNumber = () => {
    if (seconds === 0) {
      document.getElementById("beep").play();
      if (minutes === 0) {
        document.getElementById("beep").play();
        switchesTimerMode();
      } else {
        setSeconds(59);
        setMinutes(minutes - 1);
      }
    } else setSeconds(seconds - 1);
  };

  const switchesTimerMode = () => {
    if (change === "Session") {
      setChange("Break");
      setMinutes(breakLength);
      setSeconds(0);
    } else {
      setChange("Session");
      setMinutes(session);
      setSeconds(0);
    }
  };

  const decrement = () => {
    if (!timer) {
      if (breakLength !== 1) {
        setBreakLength(breakLength - 1);
      }
      if (session !== 1) {
        setSession(session - 1);
        setMinutes(session - 1);
      }
    }
  };

  const increment = () => {
    if (!timer) {
      if (breakLength <= 59) {
        setBreakLength(breakLength + 1);
      }
      if (session <= 59) {
        setSession(session + 1);
        setMinutes(session + 1);
      }
    }
  };

  const reset = () => {
    setBreakLength(5);
    setSession(25);
    setMinutes(25);
    setSeconds(0);
    setChange("Session");
    stopTimer();
    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  };

  const startStop = () => {
    timer ? stopTimer() : startTimer();
  };

  const stopTimer = () => {
    setTimer(null);
  };

  const startTimer = () => {
    setTimer("Start");
  };

  const timeLeft = () => {
    let min = minutes < 10 ? "0" + minutes : minutes;
    let sec = seconds < 10 ? "0" + seconds : seconds;
    return min + ":" + sec;
  };

  return (
    <div className="container">
      <div className="increments">
        <div className="box">
          <div id="break-label" className="text">
            Break Length
          </div>
          <div>
            <button id="break-decrement" onClick={decrement}>
              -
            </button>
            <button id="break-increment" onClick={increment}>
              +
            </button>
            <div id="break-length">{breakLength}</div>
          </div>
        </div>
        <div className="box">
          <div id="session-label" className="text">
            Session Length
          </div>
          <div>
            <button id="session-decrement" onClick={decrement}>
              -
            </button>
            <button id="session-increment" onClick={increment}>
              +
            </button>
            <div id="session-length">{session}</div>
          </div>
        </div>
      </div>

      <div className="display">
        <div id="timer-label" className="text">{change}</div>
        <div id="time-left">{timeLeft()}</div>
        <audio
          id="beep"
          src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Cartoon%20FX/578[kb]big-ol-belch-1.wav.mp3"
        />

        <div className="buttons">
          <button id="start_stop" onClick={startStop}>
            {timer ? "Stop" : "Start"}
          </button>
          <button id="reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
