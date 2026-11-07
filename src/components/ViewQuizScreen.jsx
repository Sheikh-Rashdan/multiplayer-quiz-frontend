import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getQuizFromId, deleteQuizFromId } from "../scripts/api/Quiz";
import { AuthContext } from "../Contexts";
import { deleteQuestionFromId, getQuestionsForQuiz } from "../scripts/api/Question";
import Overlay from "./Overlay";
import { TrashX, PlusCircle, Play } from "@boxicons/react";

import "./ViewQuizScreen.css";

function ViewQuizScreen() {
    const { authToken, backToLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [quiz, setQuiz] = useState();
    const [questions, setQuestions] = useState();
    const [refreshKey, setRefreshKey] = useState(0);

    const [isCreating, setIsCreating] = useState(false);

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
            <Overlay condition={isCreating}></Overlay>
        </>
    );
}

export default ViewQuizScreen;