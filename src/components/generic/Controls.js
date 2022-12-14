import Button from "./Button";

const Controls = ({ valueStart, valuePause, valueStop, valueReset, onClick }) => {
  return (
    <div style={{ display: "flex"}}>
      <Button displayName={valueStart} value={valueStart} className="btn btn-success" onClick={onClick} />
      <Button displayName={valuePause} value={valuePause} className="btn btn-warning" onClick={onClick} />
      <Button displayName={valueStop} value={valueStop} className="btn btn-danger" onClick={onClick} />
      <Button displayName={valueReset} value={valueReset} className="btn btn-danger" onClick={onClick} />
    </div>
  );
};

export default Controls;
