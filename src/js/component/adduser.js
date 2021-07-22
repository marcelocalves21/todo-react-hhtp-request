import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

const AddUser = () => {
	const { store, actions } = useContext(Context);
	const [title, setTitle] = useState("");
	const [validation, setValidation] = useState("");
	let history = useHistory("");

	return (
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
	);
};

export default AddUser;
