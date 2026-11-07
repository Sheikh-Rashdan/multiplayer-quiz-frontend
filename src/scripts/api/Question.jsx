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

export async function getQuestionFromId(backToLogin, authToken, quizId, questionId) {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/quizzes/${quizId}/questions/${questionId}`,
            { "headers": { "Authorization": `Bearer ${authToken}` } });
        const question = response.data;
        return question;
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

export async function deleteQuestionFromId(backToLogin, authToken, quizId, questionId) {
    try {
        await axios.delete(`http://127.0.0.1:8000/quizzes/${quizId}/questions/${questionId}`,
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
        await axios.post(`http://127.0.0.1:8000/quizzes/${quizId}/questions`,
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