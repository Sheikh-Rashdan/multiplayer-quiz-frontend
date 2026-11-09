import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Contexts";
import { useNavigate } from "react-router";
import { getRoom } from "../scripts/api/Room";
import BackButton from "./BackButton";
import { Sad } from "@boxicons/react";
import { getMe, getUserFromId } from "../scripts/api/User";
import { getQuizFromId } from "../scripts/api/Quiz";
import "./QuizRoomScreen.css";
import RoomSidebar from "./RoomSidebar.jsx"
import RoomMain from "./RoomMain.jsx"

let websocketApiUrl = import.meta.env.VITE_API_URL;
websocketApiUrl = "wss://" + websocketApiUrl.split("://")[1]

function QuizRoomScreen() {
  const navigate = useNavigate();

  const { authToken, backToLogin } = useContext(AuthContext);

  const [roomId, setRoomId] = useState();
  const [room, setRoom] = useState();
  const [me, setMe] = useState();
  const [isHost, setIsHost] = useState();

  const [hostName, setHostName] = useState();
  const [quiz, setQuiz] = useState();
  const [players, setPlayers] = useState({});

  const [errorMessage, setErrorMessage] = useState();
  const [answerSuccess, setAnswerSuccess] = useState();

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
          navigate("/home");
        }
      }
    );
    getMe(backToLogin, authToken).then(me => setMe(me));
  }, [])

  useEffect(() => {
    if (room == null) return;
    if (hostName == null) getUserFromId(room.host_id).then(host => setHostName(host.username));
    if (quiz == null) getQuizFromId(room.quiz_id).then(quiz => setQuiz(quiz));
  }, [room]);

  useEffect(() => {
    if (isHost == null && (room != null && me != null)) setIsHost(me.id == room.host_id);
  }, [me, room]);

  useEffect(() => {
    if (roomId == null) return;

    const websocket = new WebSocket(`${websocketApiUrl}/rooms/${roomId}?token=${authToken}`);

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
      handleResponse(data);
    }
    websocket.onerror = (error) => console.log(error);

    return () => websocket.close();
  }, [roomId]);

  function handleResponse(data) {
    if (data.type === "update") {
      setRoom(data.room);
      return;
    } else if (data.type == "answer_feedback") {
      setAnswerSuccess(data.answer_feedback);
      ws.current.send(JSON.stringify({ "type": "update" }));
      return;
    }

    setRoom((prevRoom) => {
      const newRoom = structuredClone(prevRoom);

      if (["player_left", "player_joined"].includes(data.type)) {
        newRoom.player_ids = data.player_ids;
      } else if (["start_quiz", "end_quiz"].includes(data.type)) {
        newRoom.status = data.status;
      } else if (data.type == "next_question") {
        newRoom.question_index = data.question_index;
        setAnswerSuccess(null);
      }

      return newRoom;
    });
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
      {errorMessage != null
        ? (
          <>
            <BackButton destination={isHost ? "/host" : "/join"} />
            <div className="networkFailureContainer">
              <Sad pack="filled" className="networkFailureIcon" />
              <p>{errorMessage}</p>
            </div>
          </>
        )
        : (
          <div className="quizRoomContainer">
            <RoomSidebar room={room} hostName={hostName} quiz={quiz} getPlayer={getPlayer} me={me} />
            <RoomMain room={room} quizId={quiz?.id} ws={ws} answerSuccess={answerSuccess} getPlayer={getPlayer} isHost={isHost} />
          </div>
        )
      }
    </>
  );
}

export default QuizRoomScreen;