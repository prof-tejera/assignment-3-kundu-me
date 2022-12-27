import React from "react";
import { useState, useEffect, createContext } from 'react';

import Stopwatch from "./components/timers/Stopwatch";
import Countdown from "./components/timers/Countdown";
import XY from "./components/timers/XY";
import Tabata from "./components/timers/Tabata";

export const TimerContext = createContext({});

export const AppContext = ({children}) => {
  const [timers, setTimers] = useState([]);

  const [timersTotalTime, setTimersTotalTime] = useState(0);

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
      //localStorage.setItem('nkunduapp-timers', JSON.stringify(timers));
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      URLHash.timers = timers;
      window.location.hash = `${JSON.stringify(URLHash)}`;
    }
    appNotify('timervalueupdated', {index: -1});
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
      appNotify('workoutstarted', {});
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
      "Stopwatch": <Stopwatch controls={true} index={index}/>,
      "Countdown": <Countdown controls={true} index={index}/>,
      "XY": <XY controls={true} index={index}/>,
      "Tabata": <Tabata controls={true} index={index}/>
    };
    return componentTimer[title];
  };

  const reloadTimer = () => {
    //const localStorageTimers = localStorage.getItem('nkunduapp-timers') ? JSON.parse(localStorage.getItem('nkunduapp-timers')) : [];
    let URLHash = decodeURI(window.location.hash.slice(1));
    URLHash = URLHash ? (JSON.parse(URLHash)) : {};
    const localStorageTimers = URLHash.timers ? URLHash.timers : [];
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

    setTimers(queue);
    setTimersChanged(timersChanged + 1);
  };

  const updateURLHash = (index, index2) => {
    let URLHash = decodeURI(window.location.hash.slice(1));
    URLHash = URLHash ? (JSON.parse(URLHash)) : {};
    const URLHashConfig = URLHash.config ? URLHash.config : {};
    let configIndex = URLHashConfig[index];
    let configIndex2 = URLHashConfig[index2];
    URLHashConfig[index] = configIndex2;
    URLHashConfig[index2] = configIndex;
    URLHash.config = URLHashConfig;
    window.location.hash = `${JSON.stringify(URLHash)}`;
  }

  const appNotify = (notificationId, options) => {
    if (notificationId === 'timervalueupdated') {
      let totalTime = 0;
      let queue = timers;
      // let timerconfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      let timerconfig = URLHash.config ? URLHash.config : {};
      queue.forEach((timer, index) => {
        if (timer.valid) {
          totalTime += timerconfig[index] && timerconfig[index].totalTime ? timerconfig[index].totalTime : 0;
        }
      });
      setTimersTotalTime(totalTime);
    }
    else if (notificationId === 'workoutstarted') {
      let URLHash = decodeURI(window.location.hash.slice(1));
      URLHash = URLHash ? (JSON.parse(URLHash)) : {};
      let timersQueue = URLHash.timers ? URLHash.timers : [];
      let timersconfig = URLHash.config ? URLHash.config: {};
      // let timersQueue = localStorage.getItem('nkunduapp-timers') ? JSON.parse(localStorage.getItem('nkunduapp-timers')) : [];
      // let timersconfig = localStorage.getItem('nkunduapp-timers-config') ? JSON.parse(localStorage.getItem('nkunduapp-timers-config')) : {};
      let timersState = localStorage.getItem('nkunduapp-timers-state') ? JSON.parse(localStorage.getItem('nkunduapp-timers-state')) : {};
      let timersHistory = localStorage.getItem('nkunduapp-timers-history') ? JSON.parse(localStorage.getItem('nkunduapp-timers-history')) : [];

      let totalTime = 0;

      timersHistory.push({
        datetime: new Date(),
        description: '',
        totaltime: ''
      });

      timersQueue.forEach((timer, index) => {
        if (timer.valid) {
          let _totlaTime = timersconfig[index] && timersconfig[index].totalTime ? timersconfig[index].totalTime : 0;
          totalTime += _totlaTime;
          let description = " Title: " + timer.title + " - Description: " + (timersconfig[index] && timersconfig[index].description ? timersconfig[index].description : '~');
          if (timer.title === 'Countdown') {
            description += " - CountdownValue: " + (timersconfig[index] && timersconfig[index].countdownValue ? timersconfig[index].countdownValue : 0);
          } else if (timer.title === 'Stopwatch') {
            description += " - StopwatchValue: " + (timersconfig[index] && timersconfig[index].stopwatchValue ? timersconfig[index].stopwatchValue : 0);
          } else if (timer.title === 'Tabata') {
            description += " - CountdownValue: " + (timersconfig[index] && timersconfig[index].countdownValue ? timersconfig[index].countdownValue : 0);
            description += " - RestdownValue: " + (timersconfig[index] && timersconfig[index].restdownValue ? timersconfig[index].restdownValue : 0);
            description += " - RoundValue: " + (timersconfig[index] && timersconfig[index].roundValue ? timersconfig[index].roundValue : 0);
          } else if (timer.title === 'XY') {
            description += " - CountdownValue: " + (timersconfig[index] && timersconfig[index].countdownValue ? timersconfig[index].countdownValue : 0);
            description += " - RoundValue: " + (timersconfig[index] && timersconfig[index].roundValue ? timersconfig[index].roundValue : 0);
          }
          timersHistory.push({
            datetime: '',
            description: description + " - Total Time (ms) : " + _totlaTime,
            totaltime: ''
          });
        }
      });

      timersHistory.push({
        datetime: '',
        description: '',
        totaltime: totalTime
      });
      localStorage.setItem('nkunduapp-timers-history', JSON.stringify(timersHistory));
    }
  };

  return (
      <TimerContext.Provider
        value={{
          timers,
          timersTotalTime,
          addTimer,
          updateTimer,
          deleteTimer,
          moveTimerUp,
          moveTimerDown,
          appControl,
          appNotify,
          appTimerAction,
          appTimerIndex
        }}
      >
      {children}
      </TimerContext.Provider>
    )
};

export default AppContext;
