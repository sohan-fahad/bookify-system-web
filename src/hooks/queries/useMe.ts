import { UserService } from "@src/services/apis";
import { useQuery } from "@tanstack/react-query";
import SessionUtils from "@src/utils/session.utils";

export const useMe = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: async () => {
            const response = await UserService.getMyProfile();
            return response.data;
        },
        enabled: !!SessionUtils.getToken(),
    });
};