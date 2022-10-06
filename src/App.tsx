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
	const [selectedCategory, setSelectedCategory] = useState<string>();
	const [categories, setCategories] = useState<string[]>();
	const [searchName, setSearchName] = useState<string>("");

	const getArticles = () => {
		axios.get("http://localhost:8080/articles").then((response) => setArticles(response.data));
	}

	useEffect(() => {
		getArticles()
	}, []);

	const onClick = (article: Article) => {
		setSelectedArticle(article);
		setShowEditBox(!showEditBox);
	}

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

	useEffect(() => {
		setShowAddBox(false)
	}, [showEditBox])

	useEffect(() => {
		setShowEditBox(false)
	}, [showAddBox])

	return (
		<div className="App">
			<div className="header">
				<h1><span className='title-w'>W</span>ELCOME<span className='title-p'>P</span>EDIA</h1>
				<br />
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
				<br />
				<TextField sx={{ margin: 1 }} size="small" value={searchName} onChange={(e) => setSearchName(e.target.value)}></TextField>
				<br />
				<Button variant='contained' color='success' onClick={() => setShowAddBox(!showAddBox)}>ADD ARTICLE</Button>
			</div>
			<div className="header-hitbox"></div>

			{showAddBox && <AddArticle></AddArticle>}

			{showEditBox && selectedArticle && <EditArticle selectedArticle={selectedArticle}></EditArticle>}

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
									<button className='edit' onClick={() => onClick(article)}>EDIT</button>
									<button className='delete' onClick={() => deleteArticle(article)}>DELETE</button>
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
