import React from "react";
import styled from "styled-components";

import Stopwatch from "./Stopwatch";
import Countdown from "./Countdown";
import XY from "./XY";
import Tabata from "./Tabata";
import Button from "../generic/Button";

const Timers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Timer = styled.div`
  border: 1px solid gray;
  padding: 20px;
  margin: 10px;
  font-size: 1.5rem;
`;

const TimerTitle = styled.div``;

const ConfigureTimers = ({timers, handleTimerUpdate, handleTimerDelete, handleTimerMoveUp, handleTimerMoveDown}) => {

  return (
    <Timers>
      {timers.filter((e) => e.valid).map((timer) => (
        <Timer key={`timer-${timer.title}-${timer.index}`}>
          <TimerTitle>{timer.title}</TimerTitle>
          {timer.component}
          <div style={{"display": "flex"}}>
            <Button displayName="Delete" value={timer.index} className="btn btn-danger" onClick={handleTimerDelete} />
            <Button displayName="Move Up" value={timer.index} className="btn btn-danger" onClick={handleTimerMoveUp} />
            <Button displayName="Move Down" value={timer.index} className="btn btn-danger" onClick={handleTimerMoveDown} />
          </div>
        </Timer>
      ))}
    </Timers>
  );
};

export default ConfigureTimers;
