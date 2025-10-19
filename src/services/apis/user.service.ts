import { IBaseResponse } from "@src/models/responses";
import HttpClient from "../http.service";
import { UserEntity } from "@src/models/entities";

const getMyProfile = async () => {
    const response = await HttpClient.get<IBaseResponse<UserEntity>>('/users/me');
    return response.data;
}

export const UserService = {
    getMyProfile,
}

