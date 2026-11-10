import { useEffect, useRef, useState } from "react";
import "./JoinRoomScreen.css";
import { getRoom } from "../scripts/api/Room";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle } from "@boxicons/react";
import { getUserFromId } from "../scripts/api/User";
import { getQuizFromId } from "../scripts/api/Quiz";
import BackButton from "./BackButton";
import { useNavigate } from "react-router";
import nohootLogo from "../assets/nohoot_2x.png";

function JoinRoomScreen() {
  const navigate = useNavigate();

  const roomCodeInputRef = useRef();
  const [validRoom, setValidRoom] = useState();

  const [room, setRoom] = useState();
  const [hostName, setHostName] = useState();
  const [quiz, setQuiz] = useState();

  async function checkRoomCode() {
    setRoom(null);
    setValidRoom(null);
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

  useEffect(() => {
    localStorage.removeItem("roomId");
  }, []);

  function joinRoom() {
    localStorage.setItem("roomId", room.id);
    navigate("/room")
  }

  return (
    <>
      <BackButton destination="/home" />
      <div className="parentContainer JoinRoomScreen">
        <img src={nohootLogo} className="logoImage2x" />
        <div className="primaryCard" style={{ width: "30vw" }}>
          <p>Enter Room Code</p>
          <input
            ref={roomCodeInputRef}
            type="text"
            placeholder="XXXXX"
            className="roomCodeInput"
            onChange={checkRoomCode}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
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
                      <p>Room Details:</p>
                      <div className="roomInfoRow">
                        <p>Quiz:</p><p>{quiz?.name ?? "Quiz Name"}</p>
                      </div>
                      <div className="roomInfoRow">
                        <p>Host:</p><p>{hostName ?? "Host Name"}</p>
                      </div>
                      <div className="roomInfoRow">
                        <p>Players:</p><p>{Object.keys(room?.player_ids ?? {}).length}</p>
                      </div>
                      <div className="roomInfoRow">
                        <p>Status:</p><p>{room?.status.toUpperCase()}</p>
                      </div>
                    </>
                  )
                  : <p>Invalid Code!</p>}
              </motion.div>}
          </AnimatePresence>
          <button
            className="primaryButton fillWidth"
            disabled={room == null || room.status !== "waiting"}
            onClick={joinRoom}
          >
            <p>Join</p>
            <PlayCircle pack="filled" />
          </button>
        </div>
      </div>
    </>
  );
}

export default JoinRoomScreen;