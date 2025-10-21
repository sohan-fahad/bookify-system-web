import { useQuery } from "@tanstack/react-query";
import SessionUtils from "@src/utils/session.utils";
import { ReferralService } from "@src/services/apis";

export const useMyReferralHistory = (query: { page: number, limit: number }) => {
    return useQuery({
        queryKey: ["referral-history"],
        queryFn: async () => {
            const response = await ReferralService.getMyReferralHistory(query);
            return response.data;
        },
        enabled: !!SessionUtils.getToken(),
    });
};