import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts";
import { getMyQuizzes } from "../scripts/api/Quiz";
import { getMe } from "../scripts/api/User";
import { NavLink } from "react-router";

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
                        {
                            quizzes.map(quiz => (
                                <NavLink
                                    key={quiz.id}
                                    to={`/view_quiz?quiz_id=${quiz.id}`}
                                    className="quizCard"
                                >
                                    {quiz.name}
                                </NavLink>
                            ))
                        }
                        {quizzes.length === 0 && <p>No quizzes</p>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SelectQuizScreen;