import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getQuestionsForQuiz } from "../scripts/api/Question";
import "./RoomMain.css"
import { ArrowBigRightLine } from "@boxicons/react";

function RoomMain({ room, quizId, ws }) {

  const [questions, setQuestions] = useState();

  useEffect(() => {
    if (room == null || quizId == null) return;
    if (questions == null) getQuestionsForQuiz(quizId).then(questions => setQuestions(questions));
  }, [room]);

  return (
    <div className="secondaryCard roomMainContainer">
      <WaitingElement room={room} />
      <OngoingElement room={room} questions={questions} ws={ws} />
    </div>
  );
}

function OngoingElement({ room, questions, ws }) {
  if (room?.status != "ongoing" || questions == null) return;

  const currentQuestion = questions[room.question_index];
  const [answerIndex, setAnswerIndex] = useState();
  const [lastAnswered, setLastAnswered] = useState();

  function confirmAnswer() {
    const answerMessage = {
      "type": "confirm_answer",
      "question_index": room.question_index,
      "answer_index": answerIndex
    };
    ws.current.send(JSON.stringify(answerMessage))
    setLastAnswered(room.question_index);
  }

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
      <button
        className="primaryButton submitButton"
        disabled={answerIndex == null || lastAnswered == room.question_index}
        onClick={confirmAnswer}
      >
        <p>Submit</p>
        <ArrowBigRightLine pack="filled" className="submitIcon" />
      </button>
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