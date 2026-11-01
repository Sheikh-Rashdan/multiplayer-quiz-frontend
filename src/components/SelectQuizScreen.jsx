import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts";
import { getMyQuizzes } from "../scripts/api/Quiz";
import { getMe } from "../scripts/api/User";

import { PlusCircle } from "@boxicons/react";
import nohootLogo from "../assets/nohoot_2x.png"
import "./SelectQuizScreen.css";


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
            <div className="parentContainer">
                <img src={nohootLogo} className="logoImage2x" />

                <div className="primaryCard fillWidth">
                    <button className="primaryButton fillWidth">
                        <p>Create New Quiz</p>
                        <PlusCircle pack="filled" />
                    </button>
                    <div className="spacer" />
                    <div className="quizContainer">
                        {quizzes.map(quiz => <p key={quiz.id}>{quiz.name}</p>)}
                        {quizzes.length === 0 && <p>No quizzes</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectQuizScreen;