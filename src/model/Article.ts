import { Category } from "./Category";

export interface Article {
	id: number;
	name: string;
	category: Category;
	picture: string;
	text: string;
}