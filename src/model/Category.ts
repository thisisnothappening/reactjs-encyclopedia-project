import { Article } from "./Article";

export interface Category {
	id: number;
	name: string;
	articleList: Article[];
}