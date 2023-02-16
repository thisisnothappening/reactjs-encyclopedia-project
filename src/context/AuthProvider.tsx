import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { User } from "../model/User";

const AuthContext = createContext<{
	user: User | undefined,
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
	token: string,
	setToken: React.Dispatch<React.SetStateAction<string>>,
}>({
	user: undefined,
	setUser: () => { },
	token: "",
	setToken: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [token, setToken] = useState<string>("");
	// token = accessToken

	useEffect(() => {
		axios.get(
			`http://localhost:8080/refresh`,
			{ withCredentials: true }
		)
			.then((res) => {
				console.log(res.data);
				setUser(res.data.user);
				setToken(res.data.accessToken);
			})
			.catch(error => {
				console.log(error.response);
			});
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;