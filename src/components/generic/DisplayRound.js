const DisplayRound = ({ round, total, uservalue }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        height: 50,
        textAlign: "center",
        marginBottom: 10,
      }}
    >
      {round} / {total}
      <div style = {{
        fontSize: 15,
        marginTop: 5
      }}>
        {uservalue}
      </div>
    </div>
  );
};

export default DisplayRound;
