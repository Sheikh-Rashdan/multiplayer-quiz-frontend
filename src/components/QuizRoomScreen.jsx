import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts";
import { useNavigate } from "react-router";
import { getRoom } from "../scripts/api/Room";

function QuizRoomScreen() {
  const navigate = useNavigate();
  const { authToken } = useContext(AuthContext);
  const [roomId, setRoomId] = useState();
  const [room, setRoom] = useState();

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

  return (
    <>
    </>
  );
}

export default QuizRoomScreen;