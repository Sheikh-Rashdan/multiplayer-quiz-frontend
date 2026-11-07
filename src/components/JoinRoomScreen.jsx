import { useRef } from "react";
import "./JoinRoomScreen.css";

function JoinRoomScreen() {
  const roomCodeInputRef = useRef();

  return (
    <>
      <div className="primaryCard" style={{ width: "30vw" }}>
        <p>Enter Room Code</p>
        <input
          ref={roomCodeInputRef}
          type="text"
          placeholder="XXXXX"
          className="roomCodeInput"
        />
      </div>
    </>
  );
}

export default JoinRoomScreen;