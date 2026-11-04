import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function ViewQuizScreen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [quizId, setQuizId] = useState();

    function retrieveQuizId() {
        const retrievedQuizId = searchParams.get("quiz_id");
        if (retrievedQuizId == null) {
            navigate("/host");
            return false;
        }
        setQuizId(quizId);
        return true;
    }

    useEffect(() => {
        if (!retrieveQuizId()) return;
    }, [])

    return (
        <>
        </>
    );
}

export default ViewQuizScreen;