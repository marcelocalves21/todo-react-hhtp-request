import { element } from "prop-types";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [title, setTitle] = useState("");
	const [validation, setValidation] = useState("");
	let history = useHistory("");
	return (
		<div className="row m-3 pl-2">
			<div className="col-12 text-center">
				<h1>Welcome to your To-do web application</h1>
			</div>
			<div className="col-6 text-center mt-1">
				<div className="m-5">
					<h3> Type a title to create a new to-do list</h3>
					<input
						className={validation}
						placeholder="To-do Title"
						onChange={e => setTitle(e.target.value)}
						value={title}
					/>
					<button
						className="btn btn-primary ml-4"
						onClick={() => {
							if (title === "") {
								setValidation("border border-danger");
							} else {
								setValidation("");
								actions.createUser(title);
								store.response
									? history.push("/todo")
									: alert("Something went wrong. Server down or title exists.");
							}
						}}>
						Todos
					</button>
				</div>
			</div>
			<div className="col-6 text-center mt-1">
				<div className="m-5">
					<h3>Choose a saved to-do list</h3>
					<ul className="list-group list-group-flush">
						{actions.getUsers()}
						{store.listTitle &&
							store.listTitle.map(
								(titleName, pos) =>
									pos === 0 ? (
										store.listTitle.length === 1 ? (
											"No saved list"
										) : (
											""
										)
									) : (
										<li
											className={
												pos % 2 === 0
													? "list-group-item list-group-item-secondary"
													: "list-group-item"
											}
											key={pos}>
											<span
												className="listSpan"
												style={{
													fontFamily: "Yomogi, cursive",
													fontSize: "20px"
												}}>
												{pos} - {titleName.label.toUpperCase()}
											</span>

											<a
												className="btn btn-success ml-3"
												type="button"
												onClick={() => {
													actions.setActiveTitle(titleName.label);
													history.push("/todo");
												}}>
												<i className="far fa-check-square" />
											</a>
											<a
												className="btn btn-danger text-white ml-3"
												type="button"
												onClick={() => {
													actions.deleteList(titleName.label);
													actions.updateUserslist(
														store.listTitle.filter(e => e !== titleName)
													);
													history.push("/");
												}}>
												<i className="fas fa-trash-alt" />
											</a>
										</li>
									)
							)}
					</ul>
				</div>
			</div>
		</div>
	);
};
