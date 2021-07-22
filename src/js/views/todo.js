import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import TodoListLi from "../component/todolist";

export const Todo = () => {
	const { store, actions } = useContext(Context);
	const [todo, setTodo] = useState("");

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
						store.todoList.map((element, index) => (
							<TodoListLi key={index} element={element} index={index} />
						))}
				</ul>
			</div>
		</div>
	);
};
