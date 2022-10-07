import { Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Article } from "../model/Article";

const AddArticle = () => {
	const [name, setName] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [picture, setPicture] = useState<string>('')
	const [text, setText] = useState<string>('')

	const addArticle = () => {
		if (!name || !category || !picture || !text) {
			alert('All fields are mandatory!')
			return
		}
		axios.post("http://localhost:8080/articles", 
		{ name: name, category: category, picture: picture, text: text });
	}

	return (
		<form className="AddArticle">
			<div className="form-control">
				<input type='text' placeholder='Title' value={name}
					onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-control">
				<input type='text' placeholder='Category' value={category}
					onChange={(e) => setCategory(e.target.value)} />
			</div>
			<div className="form-control">
				<input type='text' placeholder="Picture URL" value={picture}
					onChange={(e) => setPicture(e.target.value)} />
			</div>
			<div className="form-control">
				<textarea placeholder="Text" value={text}
					onChange={(e) => setText(e.target.value)} />
			</div>

			<Button size="small" variant="contained" color="success" onClick={() => addArticle()}>SAVE</Button>
		</form>
	);
}

export default AddArticle;