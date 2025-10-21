import { useQuery } from "@tanstack/react-query";
import { BookService } from "@src/services/apis";

export const useBooks = () => {
    return useQuery({
        queryKey: ["books"],
        queryFn: async () => {
            const response = await BookService.getBooks({ page: 1, limit: 10 });
            return response.data;
        },
    });
};