const Button = ({ displayName, value, className, onClick }) => {
  return (
    <div
      style={{
        padding: 10,
        marginTop: 10,
      }}
    >
      <button type="button" className={className} onClick = {onClick} value = {value}> {displayName} </button>
    </div>
  );
};

export default Button;
