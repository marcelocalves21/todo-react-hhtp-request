import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const { actions } = useContext(Context);
	const [title, setTitle] = useState("");
	return (
		<>
			<div className="text-center mt-2">
				<h1>Welcome to your To-do web application</h1>
				<div className="m-5">
					<h3> Type a title for your to-do list</h3>
					<input placeholder="To-do Title" onChange={e => setTitle(e.target.value)} value={title} />
					<Link to="/todo">
						<button className="btn btn-primary ml-4" onClick={() => actions.addTitle(title)}>
							Todos
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};
