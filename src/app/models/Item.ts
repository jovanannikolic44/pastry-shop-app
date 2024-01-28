export interface Item {
    name: string;
    description: string;
    price: string;
    composition: string[];
    type: string;
    comments: Comment[];
    imageUrl: string;
}