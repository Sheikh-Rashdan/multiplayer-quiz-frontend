import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getQuizFromId } from "../scripts/api/Quiz";
import { AuthContext } from "../Contexts";
import { deleteQuestionFromId, getQuestionsForQuiz } from "../scripts/api/Question";
import { TrashX } from "@boxicons/react";

import "./ViewQuizScreen.css";

function ViewQuizScreen() {
    const { authToken, backToLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [quiz, setQuiz] = useState();
    const [questions, setQuestions] = useState();
    const [refreshKey, setRefreshKey] = useState(0);

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
                </div>
            </div>
        </>
    );
}

export default ViewQuizScreen;