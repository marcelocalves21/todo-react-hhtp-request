const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listTitle: "No Title",
			todoList: [],
			checkItem: "",
			todos: []
		},
		actions: {
			addTitle: title => (title === "" ? setStore({ listTitle: "No title" }) : setStore({ listTitle: title })),
			getTodo: () => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marcelo")
					.then(res => res.json())
					.then(response => setStore({ todoList: response }));
			},
			deleteItem: element => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marcelo", {
					method: "PUT",
					body: JSON.stringify(element),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(() => getActions().getTodo());
			}
			// addItem: newItem => {
			// 	let newTodoList = getStore().todoList;
			// 	setStore({ todoList: [...newTodoList, newItem] });
			// },

			// deleteList: () => {
			// 	setStore({ todoList: [] });
			// }
		}
	};
};

export default getState;
