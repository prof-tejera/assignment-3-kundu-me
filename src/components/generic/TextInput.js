const TextInput = ({ value, onChange }) => {
  return (
    <div
      style={{
        padding: 0,
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <input type="text" value={value} onChange = {onChange}
        style={{
          width: "100%"
        }}
      />
    </div>
  );
};

export default TextInput;
