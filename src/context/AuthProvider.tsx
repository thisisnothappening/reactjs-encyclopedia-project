import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { User } from "../model/User";

const AuthContext = createContext<{
	user: User | undefined,
	setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
	token: string,
	setToken: React.Dispatch<React.SetStateAction<string>>,
}>({
	user: undefined,
	setUser: () => { },
	token: Cookies.get("token") || "",
	setToken: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | undefined>();
	const [token, setToken] = useState<string>(Cookies.get("token") || "");

	return (
		<AuthContext.Provider value={{ user, setUser, token, setToken }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;