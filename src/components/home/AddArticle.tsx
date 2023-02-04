import axios from "axios";
import { FC, useContext, useState } from "react";
import { ContextContainer } from "../../App";
import { GlobalProps } from "../../interface/GlobalProps";
import { Article } from "../../model/Article";

const AddArticle = () => {
	const props = useContext(ContextContainer) as GlobalProps;
	const saveForm = props.saveForm;

	const [name, setName] = useState<string>('')
	const [category, setCategory] = useState<string>('')
	const [picture, setPicture] = useState<string>('')
	const [text, setText] = useState<string>('')

	const addArticle = () => {
		if (!name || name.trim().length === 0 ||
			!category || category.trim().length === 0 ||
			!picture || picture.trim().length === 0 ||
			!text || text.trim().length === 0) {
			alert('All fields are mandatory!')
			return
		}
		axios.post("http://localhost:8080/articles",
			{ name: name, category: category, picture: picture, text: text })
			.then((article) => {
				saveForm()
				console.log(article)
			})
			.catch(error => {
				console.log(error.response)
			})
	}

	return (
		<form className="AddArticle">
			<div className="form-control">
				<input type='text' className="form-input" placeholder='Title' value={name}
					onChange={(e) => setName(e.target.value)} />
			</div>
			<div className="form-control">
				<input type='text' className="form-input" placeholder='Category' value={category}
					onChange={(e) => setCategory(e.target.value)} />
			</div>
			<div className="form-control">
				<input type='text' className="form-input" placeholder="Picture URL" value={picture}
					onChange={(e) => setPicture(e.target.value)} />
			</div>
			<div className="form-textarea">
				<textarea placeholder="Text" value={text}
					onChange={(e) => setText(e.target.value)} />
			</div>

			<button className="save" type="button" onClick={() => addArticle()}>SAVE</button>
		</form>
	);
}

export default AddArticle;