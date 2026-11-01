import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts";
import { getMyQuizzes } from "../scripts/api/Quiz";
import { getMe } from "../scripts/api/User";

function SelectQuizScreen() {
    const { authToken, backToLogin } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);

    async function loadQuizzes() {
        const quizzes = await getMyQuizzes(backToLogin, authToken);
        setQuizzes(quizzes);
    }

    useEffect(() => {
        if (authToken == null) return;
        getMe(backToLogin, authToken);
        loadQuizzes();
    }, [authToken]);

    return (
        <>
            {quizzes.map(quiz => <p key={quiz.id}>{quiz.name}</p>)}
        </>
    );
}

export default SelectQuizScreen;