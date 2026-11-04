import axios, { AxiosError } from "axios";

export async function getMyQuizzes(backToLogin, authToken) {
    try {
        const response = await axios.get("http://127.0.0.1:8000/quizzes/me",
            { "headers": { "Authorization": `Bearer ${authToken}` } });
        const quizzes = response.data;
        return quizzes;
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

export async function getQuizFromId(backToLogin, authToken, quizId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/quizzes/${quizId}`,
            { "headers": { "Authorization": `Bearer ${authToken}` } });
        const quiz = response.data;
        return quiz;
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