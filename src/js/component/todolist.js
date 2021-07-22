import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

const TodoListLi = ({ element, index }) => {
	const { store, actions } = useContext(Context);
	const [edit, setEdit] = useState(false);
	const [update, setUpdate] = useState("");
	const [todo, setTodo] = useState("");

	return index === 0 ? (
		""
	) : (
		<li className={index % 2 === 0 ? "list-group-item list-group-item-secondary" : "list-group-item"} key={index}>
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
	);
};
TodoListLi.propTypes = {
	element: PropTypes.object,
	index: PropTypes.number
};

export default TodoListLi;
