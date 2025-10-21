import { IBaseResponse, IReferralStatsResponse } from "@src/models/responses";
import HttpClient from "../http.service";
import { ReferralEntity } from "@src/models/entities";

const getMyReferralStats = async () => {
    const response = await HttpClient.get<IBaseResponse<IReferralStatsResponse>>('/referrals/my/stats');
    return response.data;
};

const getMyReferralHistory = async (query: { page: number, limit: number }) => {
    const response = await HttpClient.get<IBaseResponse<ReferralEntity[]>>(`/referrals/my?page=${query.page}&limit=${query.limit}`);
    return response.data;
};

export const ReferralService = {
    getMyReferralStats,
    getMyReferralHistory
};