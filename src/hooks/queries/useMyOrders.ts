import { useQuery } from "@tanstack/react-query";
import SessionUtils from "@src/utils/session.utils";
import { OrderService } from "@src/services/apis";

export const useMyOrders = (query: { page: number, limit: number }) => {
    return useQuery({
        queryKey: ["my-orders"],
        queryFn: async () => {
            const response = await OrderService.getMyOrders(query);
            return response.data;
        },
        enabled: !!SessionUtils.getToken(),
    });
};