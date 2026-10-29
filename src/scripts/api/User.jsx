import axios from "axios";

export async function login(username, password) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/users/login",
            { username, password }
        );

        const authToken = response.data["token"];
        return authToken;

    } catch (error) {

        if (error instanceof AxiosError) {
            if (error.response?.status === 401) {
                console.log('Invalid username or password!');
                return;
            }
        }

        throw error;
    }
}