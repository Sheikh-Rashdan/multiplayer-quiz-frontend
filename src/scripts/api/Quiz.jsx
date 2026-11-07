import axios, { AxiosError } from "axios";

export async function getMyQuizzes(backToLogin, authToken) {
    try {
        const response = await axios.get("http://127.0.0.1:8000/quizzes/me",
            { "headers": { "Authorization": `Bearer ${authToken}` } });
        const quizzes = response.data;
        return quizzes;
    } catch (error) {
        if (error instanceof AxiosError) {
            if ([401, 403, 404].includes(error.status)) {
                backToLogin();
                return;
            }
        }

        throw error;
    }
}

export async function getQuizFromId(quizId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/quizzes/${quizId}`);
        const quiz = response.data;
        return quiz;
    } catch (error) {
        if (error instanceof AxiosError) {
            if ([401, 403, 404].includes(error.status)) {
                return;
            }
        }

        throw error;
    }
}

export async function createQuiz(backToLogin, authToken, name) {
    try {
        await axios.post(`http://127.0.0.1:8000/quizzes`,
            { name },
            { "headers": { "Authorization": `Bearer ${authToken}` } });
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                backToLogin();
                return;
            }
        }

        throw error;
    }
}

export async function deleteQuizFromId(backToLogin, authToken, quizId) {
    try {
        await axios.delete(`http://127.0.0.1:8000/quizzes/${quizId}`,
            { "headers": { "Authorization": `Bearer ${authToken}` } });
    } catch (error) {
        if (error instanceof AxiosError) {
            if ([401, 403, 404].includes(error.status)) {
                backToLogin();
                return;
            }
        }
        throw error;
    }
}