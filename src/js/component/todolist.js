import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

const TodoList = () => {
	const { store, actions } = useContext(Context);
	const [todo, setTodo] = useState("");
	return (
		<div className="container-fluid ">
			<h1 className="text-center mt-3">
				<span
					style={{
						fontFamily: "Yomogi, cursive"
					}}>
					{store.listTitle}
				</span>{" "}
				to-do list
			</h1>
			<div className="text-center m-5">
				<input
					placeholder={store.listTitle + "'s list next item"}
					onChange={e => setTodo(e.target.value)}
					value={todo}
				/>
				<button
					className="btn btn-success ml-5"
					onClick={() => {
						actions.addItem(todo);
						setTodo("");
					}}>
					Add
				</button>
				<ul className="list-group list-group-flush mt-2">
					{store.todoList.map((element, index) => (
						<li
							className={
								index % 2 === 0 ? "list-group-item list-group-item-secondary" : "list-group-item"
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
										{index + 1} - {element}
									</span>
								</div>

								<div className="col-1 ml-3 text-right">
									{/* <a className="mr-3" type="button">
										<i className="far fa-check-square" />
									</a> */}
									<a type="button" onClick={() => actions.deleteItem(element)}>
										<i className="fas fa-trash-alt" />
									</a>
								</div>
							</div>
						</li>
					))}
				</ul>
				{/* <footer>Item(s) Left {store.todoList.length}</footer> */}
			</div>
		</div>
	);
};

export default TodoList;
