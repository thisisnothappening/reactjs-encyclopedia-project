import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import Login from "./Login";
import Register from "./Register";
import UserInfo from "./UserInfo";

// Auth = Register + Login
const Auth = () => {
	const [showRegisterButton, setShowRegisterButton] = useState(true);
	const [showLoginButton, setShowLoginButton] = useState(false);
	const [showLogoutButton, setShowLogoutButton] = useState(false);
	const [showRegisterForm, setShowRegisterForm] = useState(false);
	const [showLoginForm, setShowLoginForm] = useState(true);
	const [showAccount, setShowAccount] = useState(false);

	const { token } = useContext(AuthContext);
	const isAuth = token.length > 0;

	const onClickRegisterButton = () => {
		setShowRegisterButton(false);
		setShowLoginButton(true);
		setShowLogoutButton(false);
		setShowRegisterForm(true);
		setShowLoginForm(false);
		setShowAccount(false);
	};

	const onClickLoginButton = () => {
		setShowRegisterButton(true);
		setShowLoginButton(false);
		setShowLogoutButton(false);
		setShowRegisterForm(false);
		setShowLoginForm(true);
		setShowAccount(false);
	};

	const onClickLogoutButton = () => {
		setShowRegisterButton(true);
		setShowLoginButton(false);
		setShowLogoutButton(false);
		setShowRegisterForm(false);
		setShowLoginForm(true);
		setShowAccount(false);
	};

	const onClickSaveButton = () => {
		setShowRegisterButton(false);
		setShowLoginButton(false);
		setShowLogoutButton(true);
		setShowRegisterForm(false);
		setShowLoginForm(false);
		setShowAccount(true);
	};

	const logout = () => {
		axios.get(
			`${process.env.REACT_APP_HOST_NAME}/logout`,
			{ withCredentials: true }
		)
			.then(() => {
				onClickLogoutButton();
				window.location.reload();
			})
			.catch(err => {
				console.error(err.response);
				alert("Something went wrong! Check the console.");
			});
	};

	useEffect(() => {
		if (isAuth) {
			onClickSaveButton();
		} else {
			onClickLogoutButton();
		}
	}, [isAuth]);


	return (
		<div className="Auth">
			<Link to="/" className="home-button">HOME</Link>
			<div className="auth-form">
				{showRegisterButton && <button className="register-button" onClick={() => onClickRegisterButton()}>REGISTER</button>}
				{showLoginButton && <button className="login-button" onClick={() => onClickLoginButton()}>LOGIN</button>}
				{showLogoutButton && <button className='logout-button' onClick={() => logout()}>LOGOUT</button>}
				{showLoginForm && <Login onClickSaveButton={onClickSaveButton} />}
				{showRegisterForm && <Register onClickSaveButton={onClickSaveButton} />}
				{showAccount && <UserInfo />}
			</div>
		</div>
	);
};

export default Auth;