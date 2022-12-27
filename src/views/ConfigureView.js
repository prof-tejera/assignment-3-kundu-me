import React from "react";
import styled from "styled-components";

import { useContext, useEffect } from 'react';
import { TimerContext } from "../AppContext";

import ConfigureTimers from "../components/timers/ConfigureTimers";
import ConfigureTimer from "../components/timers/ConfigureTimer";
import Controls from "../components/generic/Controls"
import Button from "../components/generic/Button"
import DisplayTotalTime from "../components/generic/DisplayTotalTime";

const ConfigureView = () => {

  const { timers, timersTotalTime, addTimer, updateTimer, deleteTimer, moveTimerUp, moveTimerDown, appControl, appNotify, appTimerAction } = useContext(TimerContext);

  const handleTimerAdd = (event) => {
    const timer = event.target.value;
    const timerIndex = addTimer(timer);
  };

  const handleTimerUpdate = (event) => {
    const timerIndex = event.target.value;
    updateTimer(timerIndex);
  };


  const handleTimerDelete = (event) => {
    const timerIndex = event.target.value;
    deleteTimer(timerIndex);
  };

  const handleTimerMoveUp = (event) => {
    const timerIndex = event.target.value;
    moveTimerUp(timerIndex);
  };

  const handleTimerMoveDown = (event) => {
    const timerIndex = event.target.value;
    moveTimerDown(timerIndex);
  };

  const handleAppControlClick = (event) => {
    const value = event.target.value;
    appControl(value);
  };

  return (
    <div>
      <div style={{ display: "flex", border: "1px solid black", width: 500, height: 75, textAlign: "center", marginBottom: 10}}>
        <div style={{"marginTop": "25px"}}><label>Global Controls:</label></div>
        <Controls onClick={handleAppControlClick} valueStart="Start" valuePause={appTimerAction === 'Pause' ? 'Resume' : 'Pause'} valueStop="Stop" valueReset="Reset"/>
        <Button displayName="Fast" value="Fast" className="btn btn-success" onClick={handleAppControlClick} />
      </div>

      <div>
        <DisplayTotalTime milliseconds={timersTotalTime}></DisplayTotalTime>
      </div>
      <ConfigureTimers timers={timers} handleTimerUpdate={handleTimerUpdate} handleTimerDelete={handleTimerDelete} handleTimerMoveUp={handleTimerMoveUp} handleTimerMoveDown={handleTimerMoveDown} />
      <ConfigureTimer handleTimerAdd={handleTimerAdd} />
    </div>
  );
};

export default ConfigureView;
