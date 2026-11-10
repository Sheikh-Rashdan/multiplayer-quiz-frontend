import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../Contexts";
import { createQuiz, getMyQuizzes } from "../scripts/api/Quiz";
import { getMe } from "../scripts/api/User";
import { NavLink } from "react-router";

import { PlusCircle, X } from "@boxicons/react";
import nohootLogo from "../assets/nohoot_2x.png"
import "./SelectQuizScreen.css";
import Overlay from "./Overlay";
import BackButton from "./BackButton";

function SelectQuizScreen() {
    const { authToken, backToLogin } = useContext(AuthContext);
    const [quizzes, setQuizzes] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    const [isCreating, setIsCreating] = useState(false);
    const quizNameInputRef = useRef();
    const [isCreateInputValid, setIsCreateInputValid] = useState(false);

    async function loadQuizzes() {
        const quizzes = await getMyQuizzes(backToLogin, authToken);
        setQuizzes(quizzes);
    }

    async function createNewQuiz() {
        const newQuizName = quizNameInputRef.current?.value.trim();
        if (newQuizName.length === 0) return;

        await createQuiz(backToLogin, authToken, newQuizName);
        setRefreshKey(refreshKey + 1);
        setIsCreating(false);
    }

    useEffect(() => {
        if (authToken == null) return;
        getMe(backToLogin, authToken);
        loadQuizzes();
    }, [authToken, refreshKey]);

    function checkCreateInputValid() {
        const newQuizName = quizNameInputRef.current?.value.trim();
        setIsCreateInputValid(newQuizName.length > 0);
    }

    return (
        <>
            <BackButton destination="/home" />
            <div className="parentContainer">
                <img src={nohootLogo} className="logoImage2x" />

                <div className="primaryCard fillWidth">
                    <button
                        className="primaryButton fillWidth"
                        onClick={() => setIsCreating(true)}
                    >
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
            <Overlay condition={isCreating}>
                <div className="primaryCard">
                    <div className="overlayCardTitle">
                        <p>Create a New Quiz</p>
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
                        placeholder="Quiz Name"
                        className="fillWidth"
                        ref={quizNameInputRef}
                        onChange={checkCreateInputValid}
                        autoComplete="off"
                        autoCorrect="off"
                        spellCheck="false"
                        onKeyDown={(event) => event.key == "Enter" && isCreateInputValid && createNewQuiz()}
                    />

                    <button
                        className="primaryButton fillWidth"
                        onClick={createNewQuiz}
                        disabled={!isCreateInputValid}
                    >
                        <p>Create</p>
                        <PlusCircle pack="filled" />
                    </button>
                </div>
            </Overlay>
        </>
    );
}

export default SelectQuizScreen;