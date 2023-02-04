import axios from "axios"
import { FC, useContext, useState } from "react";
import { ContextContainer } from "../../App";
import { GlobalProps } from "../../interface/GlobalProps";
import { Article } from "../../model/Article";

const EditArticle = () => {
	const props = useContext(ContextContainer) as GlobalProps;
	const selectedArticle = props.selectedArticle;
	const saveForm = props.saveForm;

	const [name, setName] = useState<string>(selectedArticle?.name || "");
	const [category, setCategory] = useState<string>(selectedArticle?.category.name || "");
	const [picture, setPicture] = useState<string>(selectedArticle?.picture || "");
	const [text, setText] = useState<string>(selectedArticle?.text || "");

	const editArticle = () => {
		if (!name || name.trim().length === 0 ||
			!category || category.trim().length === 0 ||
			!picture || picture.trim().length === 0 ||
			!text || text.trim().length === 0) {
			alert('All fields are mandatory!');
			return;
		}
		axios.put(`http://localhost:8080/articles/${selectedArticle?.id}`,
			{ name: name, category: category, picture: picture, text: text })
			.then((article) => {
				saveForm();
				console.log(article);
			})
			.catch(error => {
				console.log(error.response);
			});
	};

	return (
		<form className="EditArticle">
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

			<button className="save" type="button" onClick={() => editArticle()}>SAVE</button>
		</form>
	);
};

export default EditArticle;