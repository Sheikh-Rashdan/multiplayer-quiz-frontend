import { useEffect, useRef, useState } from "react";
import "./JoinRoomScreen.css";
import { getRoom } from "../scripts/api/Room";
import { PlayCircle } from "@boxicons/react";

function JoinRoomScreen() {
  const roomCodeInputRef = useRef();

  const [room, setRoom] = useState();

  async function checkRoomCode() {
    setRoom(null);
    const roomCodeString = roomCodeInputRef.current.value.trim().toUpperCase();
    if (roomCodeString.length === 5) {
      const room = await getRoom(roomCodeString);
      if (room == null) {
        return;
      }
      setRoom(room);
    }
  }


  return (
    <>
      <div className="primaryCard" style={{ width: "30vw" }}>
        <p>Enter Room Code</p>
        <input
          ref={roomCodeInputRef}
          type="text"
          placeholder="XXXXX"
          className="roomCodeInput"
          onChange={checkRoomCode}
        />
        <button
          className="primaryButton fillWidth"
          disabled={room == null || room.status !== "waiting"}
        >
          <p>Join</p>
          <PlayCircle pack="filled" />
        </button>
      </div>
    </>
  );
}

export default JoinRoomScreen;