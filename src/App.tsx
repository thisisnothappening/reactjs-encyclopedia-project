import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import AuthContext from './context/AuthProvider';
import Cookies from 'js-cookie';

const App = () => {
	const { auth, setAuth } = useContext(AuthContext);

	useEffect(() => {
		setAuth(Cookies.get("token") || "");
		console.log(auth);
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
