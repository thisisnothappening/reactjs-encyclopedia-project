import axios from "axios"
import { FC, useEffect, useState } from "react"
import { Article } from "../model/Article"

export type Props = {
	selectedArticle: Article,
	saveForm: () => void
}

const EditArticle: FC<Props> = ({ selectedArticle, saveForm }) => {
	const [name, setName] = useState<string>(selectedArticle.name)
	const [category, setCategory] = useState<string>(selectedArticle.category.name)
	const [picture, setPicture] = useState<string>(selectedArticle.picture)
	const [text, setText] = useState<string>(selectedArticle.text)

	const editArticle = () => {
		if (!name || !category || !picture || !text) {
			alert('All fields are mandatory!')
			return
		}
		axios.put(`http://localhost:8080/articles/${selectedArticle.id}`, 
		{ name: name, category: category, picture: picture, text: text })
		.then(() => saveForm())
	}

	return (
		<form className="EditArticle">
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
			<div className="form-textarea">
				<textarea placeholder="Text" value={text}
					onChange={(e) => setText(e.target.value)} />
			</div>

			<button className="save" type="button" onClick={() => editArticle()}>SAVE</button>
		</form>
	)
}

export default EditArticle;