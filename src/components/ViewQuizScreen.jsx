import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { getQuizFromId } from "../scripts/api/Quiz";
import { AuthContext } from "../Contexts";
import { getQuestionsForQuiz } from "../scripts/api/Question";

function ViewQuizScreen() {
    const { authToken, backToLogin } = useContext(AuthContext);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [quiz, setQuiz] = useState();
    const [questions, setQuestions] = useState();

    async function retrieveQuiz() {
        const retrievedQuizId = searchParams.get("quiz_id");
        if (retrievedQuizId == null) {
            navigate("/host");
            return false;
        }
        setQuiz(await getQuizFromId(authToken, backToLogin, retrievedQuizId));
        setQuestions(await getQuestionsForQuiz(authToken, backToLogin, retrievedQuizId));
        return true;
    }

    useEffect(() => {
        if (!retrieveQuiz()) return;
    }, [searchParams])

    return (
        <>
        </>
    );
}

export default ViewQuizScreen;