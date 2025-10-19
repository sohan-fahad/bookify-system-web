import { SignInFormData, SignUpFormData } from "@src/schemas";
import { IAuthResponse, IBaseResponse } from "@src/models/responses";
import HttpClient from "../http.service";

const signIn = async (data: SignInFormData) => {
    const response = await HttpClient.post<IBaseResponse<IAuthResponse>>('/auth/login', {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response.data;
}

const signUp = async (data: SignUpFormData) => {
    const response = await HttpClient.post<IBaseResponse<IAuthResponse>>('/auth/register', {
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
}

export const AuthService = {
    signIn,
    signUp,
}