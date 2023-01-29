import axios from "axios";
import { FC, useState } from "react";

type Props = {
	onClickSaveButton: () => void;
}

const Login: FC<Props> = ({ onClickSaveButton }) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const login = () => {
		axios.post("http://localhost:8080/login",
			{ email: email, password: password })
			.then((token) => {
				onClickSaveButton()
				console.log(token)
			})
			.catch(err => {
				console.log(err.response)
				alert(err)
			})
	};

	return (
		<div className="Login">
			<form className="login-form">
				<h1>SIGN IN</h1>
				<div className="form-control">
					<input type='text' className="auth-input" placeholder='Email' value={email}
						onChange={(e) => setEmail(e.target.value)} />
				</div>
				<div className="form-control">
					<input type='text' className="auth-input" placeholder="Password" value={password}
						onChange={(e) => setPassword(e.target.value)} />
				</div>
				<button className="save" type="button" onClick={() => login()}>SAVE</button>
			</form>
		</div>
	);
};

export default Login;