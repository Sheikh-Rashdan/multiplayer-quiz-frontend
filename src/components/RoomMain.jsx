import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getQuestionsForQuiz } from "../scripts/api/Question";
import "./RoomMain.css"

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
  const [answerIndex, setAnswerIndex] = useState();

  return (
    <>
      <p className="questionLabel">Q{room.question_index + 1}. {currentQuestion.question}</p>
      <div className="spacer" />
      <div className="optionsRowContainer">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className="optionButton"
            data-selected={index == answerIndex}
            onClick={() => setAnswerIndex(index)}
          >
            {option}
          </button>
        ))}
      </div>
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