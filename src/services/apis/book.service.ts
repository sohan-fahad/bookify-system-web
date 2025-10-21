import { BookEntity } from "@src/models/entities";
import HttpClient from "../http.service";
import { IBaseResponse } from "@src/models/responses";

const getBooks = async (query: { page?: number, limit?: number }) => {
    const response = await HttpClient.get<IBaseResponse<BookEntity[]>>(`/books?page=${query.page}&limit=${query.limit}`);
    return response.data;
}

export const BookService = {
    getBooks,
}