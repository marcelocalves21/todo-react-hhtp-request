const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listTitle: "No Title",
			todoList: [],
			checkItem: ""
		},
		actions: {
			addTitle: title => (title === "" ? setStore({ listTitle: "No title" }) : setStore({ listTitle: title })),
			getTodo: () => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marcelo")
					.then(res => res.json())
					.then(response => getStore(setStore({ todoList: response })));
			},
			addItem: newItem => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marcelo", {
					method: "PUT",
					body: JSON.stringify(newItem),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(() => getActions().getTodo());
			},
			editItem: updateArr => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marcelo", {
					method: "PUT",
					body: JSON.stringify(updateArr),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(() => getActions().getTodo());
			},
			deleteItem: element => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marcelo", {
					method: "PUT",
					body: JSON.stringify(element),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(() => getActions().getTodo());
			}

			// deleteList: () => {
			// 	setStore({ todoList: [] });
			// }
		}
	};
};

export default getState;
