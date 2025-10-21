import { useQuery } from "@tanstack/react-query";
import SessionUtils from "@src/utils/session.utils";
import { ReferralService } from "@src/services/apis";

export const useMyReferralStats = () => {
    return useQuery({
        queryKey: ["referral-stats"],
        queryFn: async () => {
            const response = await ReferralService.getMyReferralStats();
            return response.data;
        },
        enabled: !!SessionUtils.getToken(),
    });
};