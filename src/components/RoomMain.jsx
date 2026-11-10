import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { getQuestionsForQuiz } from "../scripts/api/Question";
import "./RoomMain.css"
import { ArrowBigRightLine, PlayCircle } from "@boxicons/react";

function RoomMain({ room, quizId, ws, answerSuccess, getPlayer, isHost }) {

  const [questions, setQuestions] = useState();

  useEffect(() => {
    if (room == null || quizId == null) return;
    if (questions == null) getQuestionsForQuiz(quizId).then(questions => setQuestions(questions));
  }, [room]);

  return (
    <div className="secondaryCard roomMainContainer">
      <WaitingElement room={room} isHost={isHost} ws={ws} />
      {room?.status == "ongoing" && questions != null && (
        <OngoingElement room={room} questions={questions} ws={ws} answerSuccess={answerSuccess} isHost={isHost} />
      )}
      <FinishedElement room={room} getPlayer={getPlayer} />
    </div>
  );
}

function FinishedElement({ room, getPlayer }) {
  if (room?.status != "finished") return;

  const playerScores = Object.entries(room.player_ids);
  playerScores.sort(([id1, score1], [id2, score2]) => score2 - score1);
  playerScores.splice(3);

  return (
    <>
      <p style={{ fontSize: "3rem" }}>Quiz Ended!</p>
      <div className="podiumContainer">
        <div>
          <p className="podiumPlayerLabel">{playerScores.length >= 2 ? getPlayer(playerScores[1][0]) : "None"}</p>
          <p className="podiumPointsLabel">{playerScores.length >= 2 ? playerScores[1][1] : 0} points</p>
          <div className="spacer" />
          <div className="podium silver">
            <p>2</p>
          </div>
        </div>
        <div>
          <p className="podiumPlayerLabel">{playerScores.length >= 1 ? getPlayer(playerScores[0][0]) : "None"}</p>
          <p className="podiumPointsLabel">{playerScores.length >= 1 ? playerScores[0][1] : 0} points</p>
          <div className="spacer" />
          <div className="podium gold">
            <p>1</p>
          </div>
        </div>
        <div>
          <p className="podiumPlayerLabel">{playerScores.length >= 3 ? getPlayer(playerScores[2][0]) : "None"}</p>
          <p className="podiumPointsLabel">{playerScores.length >= 3 ? playerScores[2][1] : 0} points</p>
          <div className="spacer" />
          <div className="podium bronze">
            <p>3</p>
          </div>
        </div>
      </div>
    </>
  );
}

function OngoingElement({ room, questions, ws, answerSuccess, isHost }) {
  const currentQuestion = questions[room.question_index];
  const [answerIndex, setAnswerIndex] = useState();
  const [lastAnswered, setLastAnswered] = useState();

  useEffect(() => {
    if (lastAnswered != room.question_index) {
      setAnswerIndex(null);
    }
  }, [room]);

  function confirmAnswer() {
    const answerMessage = {
      "type": "confirm_answer",
      "question_index": room.question_index,
      "answer_index": answerIndex
    };
    ws.current.send(JSON.stringify(answerMessage))
    setLastAnswered(room.question_index);
  }

  function nextQuestion() {
    const nextMessage = {
      "type": "next_question",
    };
    ws.current.send(JSON.stringify(nextMessage))
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
            data-can-answer={lastAnswered != room.question_index && !isHost}
            data-success={answerSuccess}
            onClick={() => { if (lastAnswered != room.question_index && !isHost) setAnswerIndex(index); }}
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="primaryButton submitButton"
        disabled={(answerIndex == null || lastAnswered == room.question_index) && !isHost}
        onClick={isHost ? nextQuestion : confirmAnswer}
      >
        <p>{isHost ? "Next Question" : "Submit"}</p>
        <ArrowBigRightLine pack="filled" className="submitIcon" />
      </button>
    </>
  );
}

function WaitingElement({ room, isHost, ws }) {
  if (room?.status != "waiting") return;
  if (!isHost)
    return (
      <>
        <LoadingSpinner />
        <div className="spacer" />
        <p className="waitingLabel">Waiting for the quiz to start...</p>
      </>
    );

  function startQuiz() {
    const startMessage = {
      "type": "start_quiz"
    };
    ws.current.send(JSON.stringify(startMessage));
  }

  return (
    <>
      <p className="waitingLabel">Waiting for players to join...</p>
      <button
        className="primaryButton submitButton"
        disabled={Object.keys(room?.player_ids ?? {}).length == 0}
        onClick={startQuiz}
      >
        <p>Start</p>
        <PlayCircle pack="filled" className="submitIcon" />
      </button>
    </>
  );
}

export default RoomMain;