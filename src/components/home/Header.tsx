import { useContext } from "react";
import { Link } from "react-router-dom";
import { ContextContainer } from "../../App";
import { GlobalProps } from "../../interface/GlobalProps";
import { Category } from "../../model/Category";
import AddArticle from "./AddArticle";
import EditArticle from "./EditArticle";

const Header = () => {
	const props = useContext(ContextContainer) as GlobalProps;
	
	return (
		<div className="header">
			<div className="for-flex-purposes">
				<h1 className='title'><span className='title-w'>W</span>ELCOME<span className='title-p'>P</span>EDIA</h1>
				<Link to="/auth" className='editor-button'>EDITOR</Link>
				{props.showCloseButton && <button className='close' onClick={() => props.onClickClose()}>CLOSE</button>}
				{props.showAddButton && <button className='add' onClick={() => props.onClickAdd()}>ADD</button>}
			</div>
			{props.showFilterBox && <div className="filter-box">
				<div>
					<select value={props.searchCategory} onChange={(e) => props.setSearchCategory(e.target.value)}>
						<option value="">All</option>
						{props.categories?.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
					</select>
				</div>
				<input type="text" className='article-search' placeholder='Search...' value={props.searchName} onChange={(e) => props.setSearchName(e.target.value)} />
			</div>}
			{props.showAddBox && <AddArticle></AddArticle>}
			{props.showEditBox && props.selectedArticle && <EditArticle></EditArticle>}
		</div>
	);
};

export default Header;