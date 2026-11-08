import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getQuestionsForQuiz } from "../scripts/api/Question";

function RoomMain({ room, quizId }) {

  const [questions, setQuestions] = useState();

  useEffect(() => {
    if (room == null || quizId == null) return;
    if (questions == null) getQuestionsForQuiz(quizId).then(questions => setQuestions(questions));
  }, [room]);

  return (
    <div className="secondaryCard roomMainContainer">
      <WaitingElement room={room} />
      <OngoingElement room={room} questions={questions} />
    </div>
  );
}

function OngoingElement({ room, questions }) {
  if (room?.status != "ongoing" || questions == null) return;

  const currentQuestion = questions[room.question_index];

  return (
    <>
      <p>{currentQuestion.question}</p>
      {currentQuestion.options.map((option, index) => (
        <p key={index}>{option}</p>
      ))}
    </>
  );
}

function WaitingElement({ room }) {
  if (room?.status == "waiting")
    return (
      <>
        <LoadingSpinner />
        <div className="spacer" />
        <p style={{ fontSize: "2rem" }}>Waiting for the quiz to start...</p>
      </>
    );
}

export default RoomMain;