import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getQuestionsForQuiz } from "../scripts/api/Question";

function RoomMain({ room, quizId }) {

  const [questions, setQuestions] = useState();

  const roomStatus = room?.status;

  useEffect(() => {
    if (room == null || quizId == null) return;
    if (questions == null) getQuestionsForQuiz(quizId).then(questions => setQuestions(questions));
  }, [room]);

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