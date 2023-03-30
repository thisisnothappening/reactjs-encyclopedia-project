import axios from "axios"
import { FC, useContext, useEffect, useState } from "react"
import AuthContext from "../../context/AuthProvider"
import { Article } from "../../model/Article"

type Props = {
	selectedArticle: Article,
	saveForm: () => void
}

const EditArticle: FC<Props> = ({ selectedArticle, saveForm }) => {
	const [name, setName] = useState<string>(selectedArticle.name)
	const [category, setCategory] = useState<string>(selectedArticle.category.name)
	const [picture, setPicture] = useState<string>(selectedArticle.picture)
	const [text, setText] = useState<string>(selectedArticle.text)
	const [error, setError] = useState<string>("");

	const { token } = useContext(AuthContext);

	const editArticle = () => {
		axios.put(`http://localhost:8080/articles/${selectedArticle.id}`,
			{ name: name, category: category, picture: picture, text: text },
			{ headers: { Authorization: `Bearer ${token}` } })
			.then(() => {
				saveForm()
			})
			.catch(err => {
				console.error(err.response)
				setError(err.response.data.error || err.response.data.message);
			})
	}

	useEffect(() => {
		setError("");
	}, [name, category, picture, text]);

	return (
		<form className="EditArticle">
			{error && <div className="error">{error}</div>}
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
	)
}

export default EditArticle;