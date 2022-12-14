import { useState, useEffect, useRef, useContext } from 'react';

import DisplayTime from "../generic/DisplayTime";
import TextInput from "../generic/TextInput";
import DisplayRound from "../generic/DisplayRound";
import Button from "../generic/Button";
import Numbers from "../generic/Numbers";
import Controls from "../generic/Controls";

import { TimerContext } from "../../AppContext";


const XY = ({controls, index}) => {
  const [description, setDescription] = useState('');

  const [currentRound, setCurrentRound] = useState(0);
  const [totalRound, setTotalRound] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [totalcountdown, setTotalCountdown] = useState(0);

  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [stop, setStop] = useState(false);

  const [pauseButtonValue, setPauseButtonValue] = useState('Pause');

  const [inputType, setInputType] = useState('');
  const [inputTypeClassName, setInputTypeClassName] = useState({
    Countdown: 'btn btn-info',
    Round: 'btn btn-info'
  });
  const [countdownValue, setCountdownValue] = useState(0);
  const [roundValue, setRoundValue] = useState(0);

  const [timersReloaded, setTimersReloaded] = useState(false);
  useEffect(() => {
    if (timersReloaded === false) {
      const localStorageTimerConfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      if (localStorageTimerConfig[index]) {
        if (localStorageTimerConfig[index].description) {
          setDescription(localStorageTimerConfig[index].description);
        }
        if (localStorageTimerConfig[index].countdownValue) {
          setCountdownValue(localStorageTimerConfig[index].countdownValue);
        }
        if (localStorageTimerConfig[index].roundValue) {
          setRoundValue(localStorageTimerConfig[index].roundValue);
        }
      }

      const localStorageTimerState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      if (localStorageTimerState[index]) {
        if (localStorageTimerState[index].currentRound !== undefined) {
          setCurrentRound(localStorageTimerState[index].currentRound);
        }

        if (localStorageTimerState[index].totalRound !== undefined) {
          setTotalRound(localStorageTimerState[index].totalRound);
        }

        if (localStorageTimerState[index].countdown !== undefined) {
          setCountdown(localStorageTimerState[index].countdown);
        }

        if (localStorageTimerState[index].totalcountdown !== undefined) {
          setTotalCountdown(localStorageTimerState[index].totalcountdown);
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
      const localStorageTimerConfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      localStorageTimerConfig[index] = {
        description: description,
        countdownValue: countdownValue,
        roundValue:roundValue
      };
      localStorage.setItem('nkunduapp-timers-config', JSON.stringify(localStorageTimerConfig));
    }
  }, [description, countdownValue, roundValue]);

  useEffect(() => {
    if (!stop && !pause) {
      if (countdown > 0) {
        setTimeout(() => {
          setCountdown(countdown - 1);
          if (countdown % 999 === 0) {
            saveTimerState();
          }
        }, 1);
      }
      if (countdown === 0 && currentRound < totalRound) {
        setCurrentRound(currentRound + 1);
        setCountdown(totalcountdown);
        if (countdown % 999 === 0) {
          saveTimerState();
        }
      }
    } else if (stop) {
      setCountdown(0);
      setCurrentRound(0);
      setCountdown(0);
      saveTimerState();
    }
	}, [countdown, currentRound, start, pause, stop]);

  const saveTimerState = () => {
    if (timersReloaded) {
      const localStorageTimerState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      localStorageTimerState[index] = {
        currentRound: currentRound,
        totalRound: totalRound,
        countdown: countdown,
        totalcountdown: totalcountdown,
        start: start,
        pause: pause,
        stop: stop
      };
      localStorage.setItem('nkunduapp-timers-state', JSON.stringify(localStorageTimerState));
    }
  }

  const { appControl, appTimerAction, appTimerIndex } = useContext(TimerContext);
  useEffect(() => {
    if (appTimerAction === 'Reset') {
      handleXYClick({
        target: {
          value: appTimerAction
        }
      });
    } else if (appTimerIndex === index) {
      handleXYClick({
        target: {
          value: appTimerAction
        }
      });
    }
	}, [appTimerAction, appTimerIndex]);

  useEffect(() => {
    if (countdown === 1 && currentRound === totalRound) {
      appControl('Next');
    }
	}, [countdown, currentRound]);

  const handleXYClick = (event) => {
    let value = event.target.value;
    if (value === 'Reset') {
      setInputType('');
      setCountdownValue(0);
      setRoundValue(0);
      setCountdown(0);
      setTotalCountdown(0);
      setCurrentRound(0);
      setTotalRound(0);
      setStart(false);
      setStop(true);
      setPauseButtonValue('Pause');
    } else if (value === 'Start') {
      setCountdown(0);
      setTotalCountdown(countdownValue);
      setCurrentRound(0);
      setTotalRound(roundValue);
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
    if (inputType === 'Round') {
      setRoundValue(Number(event.target.value));
    } else {
      setCountdownValue((countdownValue * 10) + Number(event.target.value));
    }
  };

  const handleInputTypeClick = (event) => {
    setInputType(event.target.value);let objInputTypeClassName = {
      Countdown: 'btn btn-info',
      Round: 'btn btn-info'
    }
    objInputTypeClassName[event.target.value] = "btn btn-primary";
    setInputTypeClassName(objInputTypeClassName);
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
        <DisplayRound round={currentRound} total={totalRound} uservalue={roundValue}></DisplayRound>
      </div>
      <div style={{ display: "flex"}}>
        <Button displayName="Countdown" value="Countdown" className={inputTypeClassName.Countdown} onClick={handleInputTypeClick} />
        <Button displayName="Round" value="Round" className={inputTypeClassName.Round} onClick={handleInputTypeClick} />
      </div>
      <div style={{ display: "flex"}}>
        <Numbers onClick={handleNumberClick} />
      </div>
      <div style={{ display: "flex"}}>
        { controls === false ? null : <Controls onClick={handleXYClick} valueStart="Start" valuePause={pauseButtonValue} valueStop="Stop" valueReset="Reset"/> }
      </div>
    </div>
  );
};

export default XY;
