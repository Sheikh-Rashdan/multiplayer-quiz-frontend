import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Contexts";
import { useNavigate } from "react-router";
import { getRoom } from "../scripts/api/Room";
import BackButton from "./BackButton";
import { Sad } from "@boxicons/react";
import { getUserFromId } from "../scripts/api/User";
import { getQuizFromId } from "../scripts/api/Quiz";

function QuizRoomScreen() {
  const navigate = useNavigate();

  const { authToken } = useContext(AuthContext);

  const [roomId, setRoomId] = useState();
  const [room, setRoom] = useState();

  const [hostName, setHostName] = useState();
  const [quiz, setQuiz] = useState();
  const [players, setPlayers] = useState({});

  const [errorMessage, setErrorMessage] = useState();

  const ws = useRef();

  useEffect(() => {
    const retrievedRoomId = localStorage.getItem("roomId");

    getRoom(retrievedRoomId).then(
      (fetchedRoom) => {
        if (fetchedRoom != null) {
          setRoomId(retrievedRoomId);
          setRoom(fetchedRoom);
        } else {
          localStorage.removeItem("roomId");
          navigate("/join");
        }
      }
    );
  }, [])

  useEffect(() => {
    if (room == null) return;
    getUserFromId(room.host_id).then(host => setHostName(host.username));
    getQuizFromId(room.quiz_id).then(quiz => setQuiz(quiz));
  }, [room]);

  useEffect(() => {
    if (roomId == null) return;

    const websocket = new WebSocket(`ws://127.0.0.1:8000/rooms/${roomId}?token=${authToken}`);

    websocket.onopen = () => {
      console.log("CONNECTED!");
      ws.current = websocket;
    }
    websocket.onclose = (event) => {
      setErrorMessage(`${event.code} - ${event.reason}`);
      console.log(`DISCONNECTING - ${event.code} ${event.reason}`);
      ws.current = null;
    }
    websocket.onmessage = (event) => console.log(event.data);
    websocket.onerror = (error) => console.log(error);

    return () => websocket.close();
  }, [roomId]);

  return (
    <>
      {errorMessage != null && (
        <>
          <BackButton destination="/join" />
          <div className="networkFailureContainer">
            <Sad pack="filled" className="networkFailureIcon" />
            <p>{errorMessage}</p>
          </div>
        </>
      )}
      {
        errorMessage == null && (
          <div>
            {room?.id}
          </div>
        )
      }
    </>
  );
}

export default QuizRoomScreen;