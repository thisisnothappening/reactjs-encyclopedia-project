import { useState, useContext } from "react";
import AuthContext from "../../context/AuthProvider";

const UserInfo = () => {

	const { user } = useContext(AuthContext);

	return (
		<div className="UserInfo">
			<h1 className="login-welcome-text">WELCOME</h1>
			<div className="email-and-password">
				<p className="email-text">
					<span className="span-email">Email:   </span>
					{user?.email}
				</p>
				<p className="username-text">
					<span className="span-username">Username:   </span>
					{user?.username}
				</p>
			</div>
		</div>
	);
};

export default UserInfo;