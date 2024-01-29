import { Comments } from "./Comments";

export interface Item {
    id: string;
    name: string;
    description: string;
    price: string;
    composition: string[];
    type: string;
    imageUrl: string;
}