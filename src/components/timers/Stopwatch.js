import { useState, useEffect, useRef, useContext } from 'react';

import DisplayTime from "../generic/DisplayTime";
import TextInput from "../generic/TextInput";
import Button from "../generic/Button";
import Numbers from "../generic/Numbers";
import Controls from "../generic/Controls";

import { TimerContext } from "../../AppContext";

const Stopwatch = ({controls, index}) => {
  const [description, setDescription] = useState('');

  const [stopwatch, setStopwatch] = useState(0);
  const [countup, setCountup] = useState(0);

  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(false);

  const [pauseButtonValue, setPauseButtonValue] = useState('Pause');

  const [stopwatchValue, setStopwatchValue] = useState(0);

  const [timersReloaded, setTimersReloaded] = useState(false);
  useEffect(() => {
    if (timersReloaded === false) {
      //const localStorageTimerConfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      const localStorageTimerConfig = URLHash.config ? URLHash.config : {};
      if (localStorageTimerConfig[index]) {
        if (localStorageTimerConfig[index].description) {
          setDescription(localStorageTimerConfig[index].description);
        }

        if (localStorageTimerConfig[index].stopwatchValue) {
          setStopwatchValue(localStorageTimerConfig[index].stopwatchValue);
        }
      }

      const localStorageTimerState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      if (localStorageTimerState[index]) {
        if (localStorageTimerState[index].stopwatch !== undefined) {
          setStopwatch(localStorageTimerState[index].stopwatch);
        }

        if (localStorageTimerState[index].countup !== undefined) {
          setCountup(localStorageTimerState[index].countup);
        }

        if (localStorageTimerState[index].start !== undefined) {
          setStart(localStorageTimerState[index].start);
        }

        if (localStorageTimerState[index].stop !== undefined) {
          setStop(localStorageTimerState[index].stop);
        }

        if (localStorageTimerState[index].pause !== undefined) {
          setPause(localStorageTimerState[index].pause);
        }
      }
      setTimersReloaded(true);
    }
  }, [timersReloaded]);

  useEffect(() => {
    if (timersReloaded) {
      // const localStorageTimerConfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      // localStorageTimerConfig[index] = {
      //   description: description,
      //   stopwatchValue: stopwatchValue,
      //   totalTime: stopwatchValue
      // };
      // localStorage.setItem('nkunduapp-timers-config', JSON.stringify(localStorageTimerConfig));
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      if (!URLHash.config) {
        URLHash.config = {};
      }
      URLHash.config[index] = {
        description: description,
        stopwatchValue: stopwatchValue,
        totalTime: stopwatchValue
      }
      window.location.hash = `${JSON.stringify(URLHash)}`;
    }
    appNotify('timervalueupdated', {index: index});
  }, [stopwatchValue, description]);

  useEffect(() => {
    if (!stop && !pause && countup <  stopwatch) {
      setTimeout(() => {
        setCountup(countup + 1);
        if (countup % 999 === 0) {
          saveTimerState();
        }
      }, 1);
    } else if (stop) {
      setCountup(0);
      saveTimerState();
    }
	}, [countup, stopwatch, start, pause, stop]);

  const saveTimerState = () => {
    if (timersReloaded) {
      const localStorageTimerState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      localStorageTimerState[index] = {
        countup: countup,
        stopwatch: stopwatch,
        start: start,
        pause: pause,
        stop: stop
      };
      localStorage.setItem('nkunduapp-timers-state', JSON.stringify(localStorageTimerState));
      appNotify('timervalueupdated', {index: index});
    }
  }

  const { appControl, appNotify, appTimerAction, appTimerIndex } = useContext(TimerContext);
  useEffect(() => {
    if (appTimerAction === 'Reset') {
      handleStopwatchClick({
        target: {
          value: appTimerAction
        }
      });
    } else if (appTimerIndex === index) {
      handleStopwatchClick({
        target: {
          value: appTimerAction
        }
      });
    }
	}, [appTimerAction, appTimerIndex]);

  useEffect(() => {
    if (countup === stopwatch - 1) {
      appControl('Next');
    }
	}, [countup]);

  const handleStopwatchClick = (event) => {
    let value = event.target.value;
    if (value === 'Reset') {
      setStopwatchValue(0);
      setCountup(0);
      setStopwatch(0);
      setStart(false);
      setStop(true);
      setPauseButtonValue('Pause');
    } else if (value === 'Start') {
      setCountup(0);
      setStopwatch(stopwatchValue);
      setStart(true);
      setStop(false);
      setPauseButtonValue('Pause');
    } else if (value === 'Stop') {
      setStop(true);
      setPauseButtonValue('Pause');
    }  else if (value === 'Pause') {
      setPause(true);
      setPauseButtonValue('Resume');
    }  else if (value === 'Resume') {
      setPause(false);
      setPauseButtonValue('Pause');
    } else {
      // Error
    }
  };

  const handleNumberClick = (event) => {
    setStopwatchValue((stopwatchValue * 10) + Number(event.target.value));
  };

  const handleOnChangeDescription = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <div>
        <TextInput value={description} onChange={handleOnChangeDescription}/>
      </div>
      <div>
        <DisplayTime milliseconds={countup} uservalue={stopwatchValue}></DisplayTime>
      </div>
      <div style={{ display: "flex"}}>
        <Numbers onClick={handleNumberClick} />
      </div>
      <div style={{ display: "flex"}}>
        {controls === false ? null : <Controls onClick={handleStopwatchClick} valueStart="Start" valuePause={pauseButtonValue} valueStop="Stop" valueReset="Reset"/>}
      </div>
    </div>
  );
};

export default Stopwatch;
