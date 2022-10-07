import React, { FC, useEffect, useState } from 'react';
import './App.css';
import { Box, Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Article } from './model/Article';
import AddArticle from './components/AddArticle';
import axios from 'axios';
import EditArticle from './components/EditArticle';

const App = () => {
	const [articles, setArticles] = useState<Article[]>();
	const [selectedArticle, setSelectedArticle] = useState<Article>();
	const [showText, setShowText] = useState(false);
	const [showAddBox, setShowAddBox] = useState(false);
	const [showEditBox, setShowEditBox] = useState(false);
	const [showFilterBox, setShowFilterBox] = useState(true);
	const [showCloseButton, setShowCloseButton] = useState(false);
	const [showAddButton, setShowAddButton] = useState(true);
	const [showEditButton, setShowEditButton] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState<string>();
	const [categories, setCategories] = useState<string[]>();
	const [searchName, setSearchName] = useState<string>("");

	const getArticles = () => {
		axios.get("http://localhost:8080/articles").then((response) => setArticles(response.data));
	}

	useEffect(() => {
		getArticles()
	}, []);

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

	// i don't really need this function, but it's here just in case
	useEffect(() => {
		if (showAddBox === false && showEditBox === false) {
			setShowFilterBox(true)
		}
	}, [showAddBox, showEditBox])

	const deleteArticle = (article: Article) => {
		axios.delete(`http://localhost:8080/articles/${article.id}`)
			.then(() => {
				getArticles()
			})
			.catch(error => {
				console.log(error.response)
			})
	}

	const reloadArticles = () => {
		axios.get(`http://localhost:8080/articles?name=${searchName}`).then((response) => setArticles(response.data))
	}

	useEffect(() => {
		reloadArticles()
	}, [searchName])


	return (
		<div className="App">
			<div className="header">
				<div className="for-flex-purposes">
				<h1><span className='title-w'>W</span>ELCOME<span className='title-p'>P</span>EDIA</h1>
				{showCloseButton && <Button size='small' variant='contained' color='error' onClick={() => onClickClose()}>CLOSE</Button>}
				{showAddButton && <Button size='small' variant='contained' color='success' onClick={() => onClickAdd()}>ADD</Button>}
				</div>
				{showFilterBox && <div className="filter-box">
					{/*{selectedArticle && categories && <CategoryFilter selectedArticle={selectedArticle} categories={categories}></CategoryFilter>}*/}
					<FormControl>
						<InputLabel id="demo-simple-select-label">Category</InputLabel>
						<Select
							id="demo-simple-select-label"
							value={selectedCategory}
							onChange={(e) => setSelectedCategory(e.target.value)}
						>
							{categories?.map(category => <MenuItem>{category}</MenuItem>)}
						</Select>
					</FormControl>
					<TextField sx={{ margin: 1 }} size="small" value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
				</div>}
				{showAddBox && <AddArticle></AddArticle>}
				{showEditBox && selectedArticle && <EditArticle selectedArticle={selectedArticle}></EditArticle>}
			</div>
			<div className="header-hitbox"></div>

			<div className="article-list">
				<ul>
					{articles?.map(article =>
						<div className='article' key={article.id}>
							<button onClick={() => setShowText(!showText)}>
								<li>
									<div className='info'>
										<h2>{article.name}</h2>
										<p>{article.category}</p>
									</div>
									<img src={article.picture} />
								</li>
							</button>

							{showText && <div className='box'>
								<div className="buttons">
									<button className='delete' onClick={() => deleteArticle(article)}>DELETE</button>
									{showEditButton && <button className='edit' onClick={() => onClickEdit(article)}>EDIT</button>}
								</div>
								<p>{article.text}</p>
							</div>}
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default App;
