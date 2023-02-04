import { useContext } from "react";
import { ContextContainer } from "../../App";
import { GlobalProps } from "../../interface/GlobalProps";

const ArticleList = () => {
	const props = useContext(ContextContainer) as GlobalProps;

	return (
		<div className="article-list">
			<ul>
				{props.articles?.map(article =>
					<div className='article' key={article.id}>
						<button onClick={() => article.id === props.showText ? props.setShowText(-1) : props.setShowText(article.id)}>
							<div className='info'>
								<h2>{article.name}</h2>
								<p>{article.category.name}</p>
							</div>
							<img src={article.picture} />
						</button>

						{props.showText === article.id && <div className='box'>
							<div className="buttons">
								<button className='delete' onClick={() => props.deleteArticle(article)}>DELETE</button>
								{props.showEditButton && <button className='edit' onClick={() => props.onClickEdit(article)}>EDIT</button>}
							</div>
							<p>{article.text}</p>
						</div>}
					</div>
				)}
			</ul>
		</div>
	);
};

export default ArticleList;