import { useState, useEffect, useRef, useContext } from 'react';

import DisplayTime from "../generic/DisplayTime";
import TextInput from "../generic/TextInput";
import Button from "../generic/Button";
import Numbers from "../generic/Numbers";
import Controls from "../generic/Controls";

import { TimerContext } from "../../AppContext";

const Countdown = ({controls, index}) => {
  const [description, setDescription] = useState('');

  const [countdown, setCountdown] = useState(0);

  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(false);

  const [pauseButtonValue, setPauseButtonValue] = useState('Pause');

  const [countdownValue, setCountdownValue] = useState(0);

  const [timersReloaded, setTimersReloaded] = useState(false);
  useEffect(() => {
    if (timersReloaded === false) {
      //const localStorageTimerConfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      const localStorageTimerConfig = URLHash.config ? URLHash.config : {};
      if (localStorageTimerConfig[index]) {
        if(localStorageTimerConfig[index].description) {
          setDescription(localStorageTimerConfig[index].description);
        }

        if(localStorageTimerConfig[index].countdownValue) {
          setCountdownValue(localStorageTimerConfig[index].countdownValue);
        }
      }

      const localStorageTimerState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      if (localStorageTimerState[index]) {
        if (localStorageTimerState[index].countdown !== undefined) {
          setCountdown(localStorageTimerState[index].countdown);
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
      //   countdownValue: countdownValue,
      //   totalTime: countdownValue
      // };
      // localStorage.setItem('nkunduapp-timers-config', JSON.stringify(localStorageTimerConfig));
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      if (!URLHash.config) {
        URLHash.config = {};
      }
      URLHash.config[index] = {
        description: description,
        countdownValue: countdownValue,
        totalTime: countdownValue
      }
      window.location.hash = `${JSON.stringify(URLHash)}`;
    }
    appNotify('timervalueupdated', {index: index});
  }, [countdownValue, description]);

  useEffect(() => {
    if (!stop && !pause && countdown > 0) {
      setTimeout(() => {
        setCountdown(countdown - 1);
        if (countdown % 999 === 0) {
          saveTimerState();
        }
      }, 1);
    } else if (stop) {
      setCountdown(0);
      saveTimerState();
    }
	}, [countdown, start, pause, stop]);

  const saveTimerState = () => {
    if (timersReloaded) {
      const localStorageTimerState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      localStorageTimerState[index] = {
        countdown: countdown,
        start: start,
        pause: pause,
        stop: stop
      };
      localStorage.setItem('nkunduapp-timers-state', JSON.stringify(localStorageTimerState));
    }
  }

  const { appControl, appNotify, appTimerAction, appTimerIndex } = useContext(TimerContext);
  useEffect(() => {
    if (appTimerAction === 'Reset') {
      handleCountdownClick({
        target: {
          value: appTimerAction
        }
      });
    } else if (appTimerIndex === index) {
      handleCountdownClick({
        target: {
          value: appTimerAction
        }
      });
    }
	}, [appTimerAction, appTimerIndex]);

  useEffect(() => {
    if (countdown === 1) {
      appControl('Next');
    }
	}, [countdown]);

  const handleCountdownClick = (event) => {
    let value = event.target.value;
    if (value === 'Reset') {
      setCountdownValue(0);
      setCountdown(0);
      setStart(false);
      setStop(true);
      setPauseButtonValue('Pause');
    } else if (value === 'Start') {
      setCountdown(countdownValue);
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
    setCountdownValue((countdownValue * 10) + Number(event.target.value));
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
        <DisplayTime milliseconds={countdown} uservalue={countdownValue}></DisplayTime>
      </div>
      <div style={{ display: "flex"}}>
        <Numbers onClick={handleNumberClick} />
      </div>
      <div style={{ display: "flex"}}>
        {controls === false ? null : <Controls onClick={handleCountdownClick} valueStart="Start" valuePause={pauseButtonValue} valueStop="Stop" valueReset="Reset"/>}
      </div>
    </div>
  );
};

export default Countdown;
