import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import AuthContext from './context/AuthProvider';
import Cookies from 'js-cookie';
import axios from 'axios';

const App = () => {
	const { token, setToken, user, setUser } = useContext(AuthContext);

	const getUserByRefreshToken = () => {
		axios.get(
			`http://localhost:8080/users/user`,
			{ withCredentials: true }
		)
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
				console.log(user);
			})
			.catch(error => {
				console.log(error.response);
			});
	};
	// I should prolly send the user through `http://localhost:8080/refresh` instead

	useEffect(() => {
		getUserByRefreshToken();
	}, []);

	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/auth" element={<Auth />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</div>
	);
};

export default App;
