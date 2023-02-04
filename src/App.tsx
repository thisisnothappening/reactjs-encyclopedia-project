import './App.css';
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import { useState } from 'react';
import { Article } from './model/Article';
import { Category } from './model/Category';
import React from 'react';
import axios from 'axios';
import { GlobalProps } from './interface/GlobalProps';

export const ContextContainer = React.createContext({});

const App = () => {
	const [articles, setArticles] = useState<Article[]>();
	const [categories, setCategories] = useState<Category[]>();
	const [selectedArticle, setSelectedArticle] = useState<Article>();
	const [showText, setShowText] = useState<number>(-1);
	const [showAddBox, setShowAddBox] = useState(false);
	const [showEditBox, setShowEditBox] = useState(false);
	const [showFilterBox, setShowFilterBox] = useState(true);
	const [showCloseButton, setShowCloseButton] = useState(false);
	const [showAddButton, setShowAddButton] = useState(true);
	const [showEditButton, setShowEditButton] = useState(true);
	const [searchCategory, setSearchCategory] = useState<string | undefined>("");
	const [searchName, setSearchName] = useState<string>("");

	const onClickEdit = (article: Article) => {
		setSelectedArticle(article);
		setShowEditBox(true);
		setShowAddBox(false)
		setShowFilterBox(false)
		setShowAddButton(false)
		setShowCloseButton(true)
		setShowEditButton(false)
	}

	const onClickAdd = () => {
		setShowAddBox(true)
		setShowEditBox(false)
		setShowFilterBox(false)
		setShowCloseButton(true)
		setShowAddButton(false)
	}

	const onClickClose = () => {
		setShowCloseButton(false)
		setShowAddBox(false)
		setShowEditBox(false)
		setShowFilterBox(true)
		setShowAddButton(true)
		setShowEditButton(true)
	}

	const saveForm = () => {
		onClickClose()
		getArticles()
		getCategories()
	}

	const getArticles = () => {
		axios.get(`http://localhost:8080/articles`, {
			params: {
				name: searchName || "",
				category: searchCategory || "",
			}
		})
			.then((res) => {
				setArticles(res.data)
				console.log(res)
			})
			.catch(err => {
				console.log(err.response)
			})
	}

	const getCategories = () => {
		axios.get(`http://localhost:8080/categories`)
			.then((res) => {
				setCategories(res.data)
				console.log(res)
			})
			.catch(err => {
				console.log(err.response)
			})
	}

	const deleteArticle = (article: Article) => {
		axios.delete(`http://localhost:8080/articles/${article.id}`)
			.then(() => {
				props.getArticles()
				props.getCategories()
			})
			.catch(error => {
				console.log(error.response)
			})
	}

	const props: GlobalProps = {
		showCloseButton,
		showAddButton,
		showFilterBox,
		showText,
		searchCategory,
		articles,
		categories,
		searchName,
		showAddBox,
		showEditBox,
		showEditButton,
		selectedArticle,
		saveForm,
		onClickClose,
		onClickAdd,
		onClickEdit,
		setSearchName,
		setSearchCategory,
		setShowFilterBox,
		setShowText,
		setShowEditButton,
		getArticles,
		getCategories,
		deleteArticle,
	};

	return (
		<div className="App">
			<ContextContainer.Provider value={props}>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/auth" element={<Auth />} />
					<Route path="*" element={<Navigate to="/" replace />} />
				</Routes>
			</ContextContainer.Provider>
		</div>
	);
};

export default App;
