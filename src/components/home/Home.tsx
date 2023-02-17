import { useEffect, useState, useContext } from 'react';
import { Article } from '../../model/Article';
import AddArticle from './AddArticle';
import axios from 'axios';
import EditArticle from './EditArticle';
import { Category } from '../../model/Category';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';

const Home = () => {
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

	const { token } = useContext(AuthContext);
	const isAuth = token.length > 0;

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
		axios.delete(`http://localhost:8080/articles/${article.id}`,
			{ headers: { Authorization: `Bearer ${token}` } })
			.then(() => {
				getArticles()
				getCategories()
			})
			.catch(error => {
				console.log(error.response)
			})
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

	useEffect(() => {
		getArticles()
		getCategories()
	}, [searchName, searchCategory])

	const saveForm = () => {
		onClickClose()
		getArticles()
		getCategories()
	}

	return (
		<div className="Home">
			<div className="header">
				<div className="for-flex-purposes">
					<h1 className='title'><span className='title-w'>W</span>ELCOME<span className='title-p'>P</span>EDIA</h1>
					<Link to="/auth" className='editor-button'>EDITOR</Link>
					{showCloseButton && <button className='close' onClick={() => onClickClose()}>CLOSE</button>}
					{showAddButton && isAuth && <button className='add' onClick={() => onClickAdd()}>ADD</button>}
				</div>
				{showFilterBox && <div className="filter-box">
					<div>
						<select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)}>
							<option value="">All</option>
							{categories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
						</select>
					</div>
					<input type="text" className='article-search' placeholder='Search...' value={searchName} onChange={(e) => setSearchName(e.target.value)} />
				</div>}
				{showAddBox && <AddArticle saveForm={saveForm}></AddArticle>}
				{showEditBox && selectedArticle && <EditArticle selectedArticle={selectedArticle} saveForm={saveForm}></EditArticle>}
			</div>
			<div className="header-hitbox"></div>

			<div className="article-list">
				<ul>
					{articles?.map(article =>
						<div className='article' key={article.id}>
							<button onClick={() => article.id === showText ? setShowText(-1) : setShowText(article.id)}>
								<div className='info'>
									<h2>{article.name}</h2>
									<p>{article.category.name}</p>
								</div>
								<img src={article.picture} />
							</button>

							{showText === article.id && <div className='box'>
								{isAuth && <div className="buttons">
									<button className='delete' onClick={() => deleteArticle(article)}>DELETE</button>
									{showEditButton && <button className='edit' onClick={() => onClickEdit(article)}>EDIT</button>}
								</div>}
								<p>{article.text}</p>
							</div>}
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Home;