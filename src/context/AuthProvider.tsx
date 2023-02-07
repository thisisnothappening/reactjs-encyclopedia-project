import Cookies from "js-cookie";
import { createContext, useState } from "react";

const AuthContext = createContext<{ auth: string, setAuth: React.Dispatch<React.SetStateAction<string>> }>({
	auth: Cookies.get("token") || "",
	setAuth: () => {}
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState(Cookies.get("token") || "");

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;