import Button from "./Button";

const Numbers = ({ onClick }) => {
  return (
    <div style={{ display: "flex"}}>
      <Button displayName="1" value="1" className="btn btn-primary" onClick={onClick} />
      <Button displayName="2" value="2" className="btn btn-primary" onClick={onClick} />
      <Button displayName="3" value="3" className="btn btn-primary" onClick={onClick} />
      <Button displayName="4" value="4" className="btn btn-primary" onClick={onClick} />
      <Button displayName="5" value="5" className="btn btn-primary" onClick={onClick} />
      <Button displayName="6" value="6" className="btn btn-primary" onClick={onClick} />
      <Button displayName="7" value="7" className="btn btn-primary" onClick={onClick} />
      <Button displayName="8" value="8" className="btn btn-primary" onClick={onClick} />
      <Button displayName="9" value="9" className="btn btn-primary" onClick={onClick} />
      <Button displayName="0" value="0" className="btn btn-primary" onClick={onClick} />
    </div>
  );
};

export default Numbers;
