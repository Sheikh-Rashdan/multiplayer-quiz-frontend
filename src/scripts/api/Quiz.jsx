import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getMyQuizzes(backToLogin, authToken) {
    try {
        const response = await axios.get(`${apiUrl}/quizzes/me`,
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
        const response = await axios.get(`${apiUrl}/quizzes/${quizId}`);
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
        await axios.post(`${apiUrl}/quizzes`,
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
        await axios.delete(`${apiUrl}/quizzes/${quizId}`,
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