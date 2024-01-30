import { Basket } from "./Basket";

export interface OrderRequest {
    id: number,
    username: string,
    items: Basket[]
}