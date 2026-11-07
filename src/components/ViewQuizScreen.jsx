import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getQuizFromId, deleteQuizFromId } from "../scripts/api/Quiz";
import { AuthContext } from "../Contexts";
import { deleteQuestionFromId, getQuestionsForQuiz } from "../scripts/api/Question";
import Overlay from "./Overlay";
import { TrashX, PlusCircle, Play, X, RadioCircle, RadioCircleMarked, MinusCircle } from "@boxicons/react";

import "./ViewQuizScreen.css";

function ViewQuizScreen() {
    const { authToken, backToLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [quiz, setQuiz] = useState();
    const [questions, setQuestions] = useState();
    const [refreshKey, setRefreshKey] = useState(0);

    const [isCreating, setIsCreating] = useState(false);
    const questionInputRef = useRef();
    const [optionCount, setOptionCount] = useState(2)
    const [answerIndex, setAnswerIndex] = useState(0);

    async function retrieveQuiz() {
        const retrievedQuizId = searchParams.get("quiz_id");
        if (retrievedQuizId == null) {
            navigate("/host");
            return false;
        }
        setQuiz(await getQuizFromId(backToLogin, authToken, retrievedQuizId));
        setQuestions(await getQuestionsForQuiz(backToLogin, authToken, retrievedQuizId));
        return true;
    }

    async function deleteQuestion(questionToDelete) {
        await deleteQuestionFromId(backToLogin, authToken, quiz.id, questionToDelete.id);
        setRefreshKey(refreshKey + 1);
    }

    async function deleteQuiz() {
        await deleteQuizFromId(backToLogin, authToken, quiz.id);
        navigate("/host");
    }

    useEffect(() => {
        if (!retrieveQuiz()) return;
    }, [searchParams, refreshKey])


    function verifyAndSetAnswerIndex(newAnswerIndex) {
        if (newAnswerIndex < 0 || newAnswerIndex >= optionCount) {
            setAnswerIndex(0);
            return;
        }
        setAnswerIndex(newAnswerIndex);
    }

    function verifyAndSetOptionCount(newOptionCount) {
        if (newOptionCount <= 2) {
            setOptionCount(2);
            return;
        }
        setOptionCount(newOptionCount);

    }

    useEffect(() => verifyAndSetAnswerIndex(answerIndex), [optionCount]);

    return (
        <>
            <div className="secondaryCard">
                <p className="quizName">{quiz?.name}</p>
                <div className="spacer" />
                <div className="questionContainer">
                    {
                        questions?.map((question, index) => (
                            <div key={question.id} className="questionCard">
                                <div className="questionNumberContainer">{index + 1}</div>
                                <div className="questionDetailsContainer">
                                    <p className="questionLabel">{question.question}</p>
                                    <div className="optionsContainer">
                                        {question.options.map((option, index) => (
                                            <p key={index}>{`${index + 1}. ${option}`}</p>
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className="deleteButton"
                                    onClick={() => deleteQuestion(question)}>
                                    <TrashX pack="filled" />
                                </button>
                            </div>
                        ))
                    }
                    {
                        (questions == null || questions?.length === 0) && (
                            <p style={{ textAlign: "center" }}>No questions</p>
                        )
                    }
                </div>
                <div className="buttonRow fillWidth">
                    <button
                        className="secondaryButton"
                        onClick={deleteQuiz}
                    >
                        <p>Delete Quiz</p>
                        <TrashX pack="filled" />
                    </button>
                    <button
                        className="secondaryButton"
                        onClick={() => setIsCreating(true)}
                    >
                        <p>Add New Question</p>
                        <PlusCircle pack="filled" />
                    </button>
                </div>
                <button
                    className="primaryButton fillWidth"
                >
                    <p>Start Quiz</p>
                    <Play pack="filled" />
                </button>
            </div>
            <Overlay condition={isCreating}>
                <div className="primaryCard">
                    <div className="overlayCardTitle">
                        <p>Add a New Question</p>
                        <button
                            className="secondaryButton"
                            onClick={() => setIsCreating(false)}
                        >
                            <X pack="filled" />
                        </button>
                    </div>
                    <div className="spacer"></div>
                    <input
                        type="text"
                        placeholder="Question"
                        className="fillWidth"
                        ref={questionInputRef}
                    />
                    <div className="overlayCardDivider" />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        <button className="secondaryButton" onClick={() => verifyAndSetOptionCount(optionCount - 1)}>
                            <MinusCircle pack="filled" />
                        </button>
                        <p style={{ fontWeight: 500, fontSize: "1.3rem" }}>
                            Option Count: {optionCount}
                        </p>
                        <button className="secondaryButton" onClick={() => verifyAndSetOptionCount(optionCount + 1)}>
                            <PlusCircle pack="filled" />
                        </button>
                    </div>
                    <div className="optionContainer">
                        {
                            Array.from({ length: optionCount }, (_, index) => (
                                <div key={index} className="optionCard">
                                    <input
                                        type="text"
                                        placeholder={`Option ${index + 1}`}
                                        className="fillWidth"
                                    />
                                    <button
                                        onClick={() => verifyAndSetAnswerIndex(index)}
                                        style={{ background: "none", padding: 0, cursor: "pointer" }}
                                    >
                                        {
                                            answerIndex === index
                                                ? <RadioCircleMarked pack="filled" />
                                                : <RadioCircle pack="filled" />
                                        }
                                    </button>
                                </div>
                            ))
                        }
                    </div>
                    <div className="overlayCardDivider" />
                    <button
                        className="primaryButton fillWidth"
                    >
                        <p>Add</p>
                        <PlusCircle pack="filled" />
                    </button>
                </div>
            </Overlay>
        </>
    );
}

export default ViewQuizScreen;