import { useEffect, useRef, useState } from "react";
import "./JoinRoomScreen.css";
import { getRoom } from "../scripts/api/Room";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle } from "@boxicons/react";
import { getUserFromId } from "../scripts/api/User";
import { getQuizFromId } from "../scripts/api/Quiz";

function JoinRoomScreen() {
  const roomCodeInputRef = useRef();
  const [validRoom, setValidRoom] = useState();

  const [room, setRoom] = useState();
  const [hostName, setHostName] = useState();
  const [quiz, setQuiz] = useState();

  async function checkRoomCode() {
    setValidRoom(null);
    setRoom(null);
    const roomCodeString = roomCodeInputRef.current.value.trim().toUpperCase();
    if (roomCodeString.length === 5) {
      const room = await getRoom(roomCodeString);
      if (room == null) {
        setValidRoom(false);
        return;
      }
      setValidRoom(true);
      setRoom(room);
    }
  }

  useEffect(() => {
    if (room == null) return;
    getUserFromId(room.host_id).then((user) => setHostName(user?.username));
    getQuizFromId(room.quiz_id).then((quiz) =>
      setQuiz(quiz));
  }, [room]);

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
        <AnimatePresence>
          {validRoom != null &&
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="roomInfoContainer"
            >
              {validRoom
                ? (
                  <>
                    <p>Room valid</p>
                  </>
                )
                : <p>Invalid Code!</p>}
            </motion.div>}
        </AnimatePresence>
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