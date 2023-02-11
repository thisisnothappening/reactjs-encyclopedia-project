import { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { User } from "../../model/User";

const UserInfo = () => {

	const { user } = useContext(AuthContext);

	return (
		<div className="UserInfo">
			<h1 className="login-welcome-text">WELCOME</h1>
			<div>
				<p>ID: {user?.id}</p>
				<p>Email: {user?.email}</p>
				<p>Username: {user?.username}</p>
				<p>Password: {user?.password}</p>
				<p>Refresh Token: {user?.refreshToken}</p>
				<p>Created At: {user?.createdAt}</p>
				<p>Updated At: {user?.updatedAt}</p>
			</div>
		</div>
	);
};

export default UserInfo;