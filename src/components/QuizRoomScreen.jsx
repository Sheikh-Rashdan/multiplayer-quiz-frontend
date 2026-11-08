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
    if (hostName != null || quiz != null) return;
    getUserFromId(room.host_id).then(host => setHostName(host.username));
    getQuizFromId(room.quiz_id).then(quiz => setQuiz(quiz));
  }, [room]);

  useEffect(() => {
    if (roomId == null) return;

    const websocket = new WebSocket(`ws://127.0.0.1:8000/rooms/${roomId}?token=${authToken}`);

    websocket.onopen = () => {
      console.log("CONNECTED!");
      ws.current = websocket;
      websocket.send(JSON.stringify({ "type": "update" }));
    }
    websocket.onclose = (event) => {
      setErrorMessage(`${event.code} - ${event.reason}`);
      console.log(`DISCONNECTING - ${event.code} ${event.reason}`);
      ws.current = null;
    }
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data);
      handleResponse(data);
    }
    websocket.onerror = (error) => console.log(error);

    return () => websocket.close();
  }, [roomId]);

  function handleResponse(data) {
    if (data.type === "update") {
      setRoom(data.room);
    } else if (["player_left", "player_joined"].includes(data.type)) {
      const newRoom = structuredClone(room);
      newRoom.player_ids = data.player_ids;
      setRoom(newRoom);
    } else if (["start_quiz", "end_quiz"].includes(data.type)) {
      const newRoom = structuredClone(room);
      newRoom.status = data.status;
      setRoom(newRoom);
    }
  }

  function getPlayer(player_id) {
    const retrievedPlayer = players[player_id];
    if (retrievedPlayer) return retrievedPlayer;

    let username;
    getUserFromId(player_id).then(player => {
      username = player.username;
      const newPlayers = structuredClone(players);
      newPlayers[player_id] = username;
      setPlayers(newPlayers);
    });
    return username;
  }

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