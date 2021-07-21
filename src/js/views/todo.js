import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const Todo = () => {
	const { store, actions } = useContext(Context);
	const [todo, setTodo] = useState("");
	const [edit, setEdit] = useState(false);
	const [update, setUpdate] = useState("");
	let history = useHistory("");

	return (
		<div className="container-fluid ">
			<h1 className="text-center mt-3">
				<span
					style={{
						fontFamily: "Yomogi, cursive"
					}}>
					{store.activeTitle.toUpperCase()}
				</span>{" "}
				to-do list
			</h1>
			<div className="text-center m-5">
				<input
					placeholder={store.activeTitle + "'s list next item"}
					onChange={e => setTodo(e.target.value)}
					value={todo}
				/>
				<button
					className="btn btn-success ml-3"
					onClick={() => {
						actions.addItem([...store.todoList, { label: todo, done: false }]);
						setTodo("");
					}}>
					Add
				</button>
				<ul className="list-group list-group-flush mt-2">
					{store.todoList &&
						store.todoList.map(
							(element, index) =>
								index === 0 ? (
									""
								) : (
									<li
										className={
											index % 2 === 0
												? "list-group-item list-group-item-secondary"
												: "list-group-item"
										}
										key={index}>
										<div className="row">
											<div className="col-sm-3 offset-sm-4 mr-3 text-left">
												<span
													className="listSpan"
													style={{
														fontFamily: "Yomogi, cursive",
														fontSize: "20px"
													}}>
													{!edit ? (
														`${index} - ${element.label}`
													) : (
														<>
															<input
																placeholder={element.label}
																onChange={el => setUpdate(el.target.value)}
																value={update}
															/>
														</>
													)}
												</span>
											</div>
											<div className="col-1 ml-3 text-right">
												{!edit ? (
													<a className="mr-3" type="button" onClick={() => setEdit(true)}>
														<i className="far fa-edit" />
													</a>
												) : (
													<a
														className="mr-3"
														type="button"
														onClick={() => {
															let updateItem = store.todoList;
															updateItem[index] = { label: update, done: false };
															actions.editItem(updateItem);
															setEdit(false);
															setUpdate("");
														}}>
														<i className="far fa-check-square" />
													</a>
												)}
												<a
													className="btn btn-danger"
													type="button"
													onClick={() => {
														actions.deleteItem(store.todoList.filter(e => e !== element));
													}}>
													<i className="fas fa-trash-alt" />
												</a>
											</div>
										</div>
									</li>
								)
						)}
				</ul>
			</div>
		</div>
	);
};
