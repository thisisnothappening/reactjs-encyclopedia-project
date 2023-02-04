import { useContext, useEffect, useState } from 'react';
import { Article } from '../../model/Article';
import axios from 'axios';
import { Category } from '../../model/Category';
import ArticleList from './ArticleList';
import Header from './Header';
import { ContextContainer } from '../../App';
import { GlobalProps } from '../../interface/GlobalProps';

const Home = () => {
	const props = useContext(ContextContainer) as GlobalProps;

	// i don't really need this function, but it's here just in case
	useEffect(() => {
		if (props.showAddBox === false && props.showEditBox === false) {
			props.setShowFilterBox(true)
		}
	}, [props.showAddBox, props.showEditBox])

	useEffect(() => {
		props.getArticles()
		props.getCategories()
	}, [props.searchName, props.searchCategory]);

	return (
		<div className="Home">
			<Header />
			<div className="header-hitbox"></div>
			<ArticleList />
		</div>
	);
}

export default Home;