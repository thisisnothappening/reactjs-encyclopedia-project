import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";

const App = () => {

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
