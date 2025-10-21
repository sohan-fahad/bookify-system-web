import HttpClient from "../http.service";
import { IBaseResponse } from "@src/models/responses";
import { OrderEntity } from "@src/models/entities";

const createOrder = async (items: { bookId: string, quantity: number }[]) => {
    const response = await HttpClient.post<IBaseResponse<OrderEntity>>('/orders', {
        body: JSON.stringify({ items }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

const getMyOrders = async (query: { page?: number, limit?: number }) => {
    query.page = query.page || 1;
    query.limit = query.limit || 10;

    const response = await HttpClient.get<IBaseResponse<OrderEntity[]>>(`/orders/my-orders?page=${query.page}&limit=${query.limit}`);
    return response.data;
};

export const OrderService = {
    createOrder,
    getMyOrders,
};
