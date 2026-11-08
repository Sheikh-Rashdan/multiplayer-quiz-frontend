import LoadingSpinner from "./LoadingSpinner";

function RoomMain({ room, quizId }) {

  const roomStatus = room?.status;

  return (
    <div className="secondaryCard roomMainContainer">
      <WaitingElement roomStatus={roomStatus} />
    </div>
  );
}

function WaitingElement({ roomStatus }) {
  if (roomStatus == "waiting")
    return (
      <>
        <LoadingSpinner />
        <div className="spacer" />
        <p style={{ fontSize: "2rem" }}>Waiting for the quiz to start...</p>
      </>
    );
}

export default RoomMain;