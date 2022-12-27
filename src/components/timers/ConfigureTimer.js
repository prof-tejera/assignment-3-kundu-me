import React from "react";

import Button from "../generic/Button";

const ConfigureTimer = ({handleTimerAdd}) => {
  return (
    <div style={{ display: "flex", border: "1px solid black", width: 500, height: 75, textAlign: "center", marginBottom: 10,}}>
      <div style={{"marginTop": "20px"}}><label>Add Timer: </label></div>
      <Button displayName="+ Stopwatch" value="Stopwatch" className="btn btn-primary" onClick={handleTimerAdd} />
      <Button displayName="+ Countdown" value="Countdown" className="btn btn-primary" onClick={handleTimerAdd} />
      <Button displayName="+ XY" value="XY" className="btn btn-primary" onClick={handleTimerAdd} />
      <Button displayName="+ Tabata" value="Tabata" className="btn btn-primary" onClick={handleTimerAdd} />
    </div>
  );
};

export default ConfigureTimer;
