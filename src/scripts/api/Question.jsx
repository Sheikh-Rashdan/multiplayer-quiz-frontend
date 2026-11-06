import axios, { AxiosError } from "axios";

export async function getQuestionsForQuiz(backToLogin, authToken, quizId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/quizzes/${quizId}/questions`,
            { "headers": { "Authorization": `Bearer ${authToken}` } });
        const questions = response.data;
        return questions;
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