import React from "react";
import { useState, useEffect, createContext } from 'react';

import Stopwatch from "./components/timers/Stopwatch";
import Countdown from "./components/timers/Countdown";
import XY from "./components/timers/XY";
import Tabata from "./components/timers/Tabata";

export const TimerContext = createContext({});

export const AppContext = ({children}) => {
  const [timers, setTimers] = useState([]);

  const [timersChanged, setTimersChanged] = useState(0);

  const [appTimerAction, setAppTimerAction] = useState('');
  const [appTimerIndex, setAppTimerIndex] = useState(-1);

  const [timersReloaded, setTimersReloaded] = useState(false);
  useEffect(() => {
    if (timersReloaded === false) {
      reloadTimer();
      setTimersReloaded(true);
    }
  }, [timersReloaded]);

  useEffect(() => {
    if (timersReloaded) {
      localStorage.setItem('nkunduapp-timers', JSON.stringify(timers));
    }
  }, [timersChanged]);

  const getNextValidIndex = (index) => {
    for (let i = index + 1; i < timers.length; i++) {
      if (timers[i].valid) {
        return i;
      }
    }
    return false;
  };

  const getPrevValidIndex = (index) => {
    for (let i = index - 1; i >= 0; i--) {
      if (timers[i].valid) {
        return i;
      }
    }
    return false;
  };

  const appControl = (value) => {
    if (value === 'Reset') {
      setAppTimerAction(value);
    } else if (value === 'Start') {
      setAppTimerAction(value);
      const appTimerNextIndex = getNextValidIndex(appTimerIndex);
      if (appTimerNextIndex === false) {
        setAppTimerIndex(0);
      } else {
        setAppTimerIndex(appTimerNextIndex);
      }
    } else if (value === 'Stop') {
      setAppTimerAction(value);
    }  else if (value === 'Pause') {
      setAppTimerAction(value);
    }  else if (value === 'Resume') {
      setAppTimerAction(value);
    }  else if (value === 'Next') {
      setAppTimerAction('Start');
      const appTimerNextIndex = getNextValidIndex(appTimerIndex);
      if (appTimerNextIndex === false) {
        setAppTimerIndex(-1);
      } else {
        setAppTimerIndex(appTimerNextIndex);
      }
    } else if (value === 'Fast') {
      setAppTimerAction('Stop');
      setTimeout(() => {
        setAppTimerAction('Start');
        const appTimerNextIndex = getNextValidIndex(appTimerIndex);
        if (appTimerNextIndex === false) {
          setAppTimerIndex(-1);
        } else {
          setAppTimerIndex(appTimerNextIndex);
        }
      }, 500);
    } else {
      // Error
    }
  };

  const getComponentTimer = (index, title) => {
    const componentTimer = {
      "Stopwatch": <Stopwatch controls={true} index={index} />,
      "Countdown": <Countdown controls={true} index={index} />,
      "XY": <XY controls={true} index={index} />,
      "Tabata": <Tabata controls={true} index={index} />
    };
    return componentTimer[title];
  };

  const reloadTimer = () => {
    const localStorageTimers = localStorage.getItem('nkunduapp-timers') ? JSON.parse(localStorage.getItem('nkunduapp-timers')) : [];
    console.log(localStorageTimers);
    let queue = [];
    localStorageTimers.forEach((localStorageTimer, index) => {
      queue.push({
        title: localStorageTimer.title,
        data: null,
        component: getComponentTimer(index, localStorageTimer.title),
        valid: localStorageTimer.valid,
        index: index
      });
    });
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  }

  const addTimer = (title) => {
    let queue = timers;
    const index = queue.length;

    queue.push({
      title: title,
      data: null,
      component: getComponentTimer(index, title),
      valid: true,
      index: index
    });
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const updateTimer = (index, data) => {
    let queue = timers;
    queue[index].valid = true;
    queue[index].data = data;
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const deleteTimer = (index) => {
    let queue = timers;
    queue[index].valid = false;
    queue[index].data = null;
    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const moveTimerUp = (index) => {
    index = parseInt(index);
    const index2 = getPrevValidIndex(index);

    if (index2 === false) {
      return
    }

    let queue = timers;

    let q1 = queue[index];
    let q2 = queue[index2];

    q1.index = index2;
    q2.index = index;

    queue[index2] = q1;
    queue[index] = q2;

    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const moveTimerDown = (index) => {
    index = parseInt(index);
    const index2 = getNextValidIndex(index);

    if (index2 === false) {
      return
    }

    let queue = timers;

    let q1 = queue[index];
    let q2 = queue[index2];

    q1.index = index2;
    q2.index = index;

    queue[index2] = q1;
    queue[index] = q2;

    console.log(queue);

    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  return (
      <TimerContext.Provider
        value={{
          timers,
          addTimer,
          updateTimer,
          deleteTimer,
          moveTimerUp,
          moveTimerDown,
          appControl,
          appTimerAction,
          appTimerIndex
        }}
      >
      {children}
      </TimerContext.Provider>
    )
};

export default AppContext;
