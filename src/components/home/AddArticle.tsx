import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
//

type Props = {
	saveForm: () => void
}

const AddArticle: FC<Props> = ({ saveForm }) => {
	const [name, setName] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [picture, setPicture] = useState<string>("");
	const [text, setText] = useState<string>("");
	const [error, setError] = useState<string>("");

	const { token } = useContext(AuthContext);

	const addArticle = () => {
		axios.post("http://localhost:8080/articles",
			{ name: name, category: category, picture: picture, text: text },
			{ headers: { Authorization: `Bearer ${token}` } })
			.then((article) => {
				saveForm();
				console.log(article);
			})
			.catch(err => {
				console.log(err.response);
				setError(err.response.data.error || err.response.data.message);
			});
	};

	useEffect(() => {
		setError("");
	}, [name, category, picture, text]);

	return (
		<form className="AddArticle">
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

			<button className="save" type="button" onClick={() => addArticle()}>SAVE</button>
		</form>
	);
}

export default AddArticle;