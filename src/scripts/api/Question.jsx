import axios, { AxiosError } from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export async function getQuestionsForQuiz(quizId) {
    try {
        const response = await axios.get(`${apiUrl}/quizzes/${quizId}/questions`);
        const questions = response.data;
        return questions;
    } catch (error) {
        if (error instanceof AxiosError) {
            if ([401, 403, 404].includes(error.status)) {
                return;
            }
        }

        throw error;
    }
}

export async function getQuestionFromId(quizId, questionId) {
    try {
        const response = await axios.get(`${apiUrl}/quizzes/${quizId}/questions/${questionId}`);
        const question = response.data;
        return question;
    } catch (error) {
        if (error instanceof AxiosError) {
            if ([401, 403, 404].includes(error.status)) {
                return;
            }
        }

        throw error;
    }
}

export async function deleteQuestionFromId(backToLogin, authToken, quizId, questionId) {
    try {
        await axios.delete(`${apiUrl}/quizzes/${quizId}/questions/${questionId}`,
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

export async function createQuestion(backToLogin, authToken, quizId, question, options, answer_index) {
    try {
        await axios.post(`${apiUrl}/quizzes/${quizId}/questions`,
            { question, options, answer_index },
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