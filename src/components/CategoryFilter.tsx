import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Article } from "../model/Article";

const CategoryFilter = ({ selectedArticle }: { selectedArticle: Article }) => {
	const [selectedCategory, setSelectedCategory] = useState<string>(selectedArticle.category);
	const [categories, setCategories] = useState<string[]>()

	return (
		<FormControl>
			<InputLabel id="demo-simple-select-label">Category</InputLabel>
			<Select
				id="demo-simple-select-label"
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
				>
				</Select>
		</FormControl>
	)
}

export default CategoryFilter;