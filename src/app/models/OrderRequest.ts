import { Basket } from "./Basket";

export interface OrderRequest {
    id: number,
    username: string,
    items: string,
    totalPrice: number,
    acceptance: string
}