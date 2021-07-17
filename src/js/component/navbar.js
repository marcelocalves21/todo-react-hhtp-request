import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { actions } = useContext(Context);
	return (
		<nav className="navbar navbar-dark bg-dark mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1">Todo List</span>
			</Link>
			<div className="ml-auto">
				<Link to="/">
					<button className="btn btn-primary" onClick={() => actions.deleteList()}>
						Home
					</button>
				</Link>
			</div>
		</nav>
	);
};
