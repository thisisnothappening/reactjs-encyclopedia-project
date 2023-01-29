import axios from "axios";
import { FC, useState } from "react";

type Props = {
	onClickSaveButton: () => void;
}

const Register: FC<Props> = ({ onClickSaveButton }) => {
	const [email, setEmail] = useState<string>("");
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const register = () => {
		axios.post("http://localhost:8080/register",
			{ email: email, username: username, password: password })
			.then((user) => {
				onClickSaveButton()
				console.log(user)
			})
			.catch(err => {
				console.log(err.response)
				alert(err)
			})
	};

	return (
		<div className="Register">
			<form className="login-form">
				<h1>SIGN UP</h1>
				<div className="form-control">
					<input type='text' className="auth-input" placeholder='Email' value={email}
					onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-control">
					<input type='text' className="auth-input" placeholder='Username' value={username}
					onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="form-control">
					<input type='text' className="auth-input" placeholder="Password" value={password}
					onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button className="save" type="button" onClick={() => register()}>SAVE</button>
			</form>
		</div>
	);
}

export default Register;