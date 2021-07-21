const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listTitle: ["marcelo", "marcelo2"],
			activeTitle: "",
			todoList: [],
			checkItem: "",
			response: true
		},
		actions: {
			createUser: title => {
				let newTitle = getStore().listTitle;

				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${title}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([]),
					redirect: "follow"
				}).then(res => {
					if (res.ok) {
						getStore(setStore({ listTitle: [...newTitle, title] }));
						getStore(setStore({ activeTitle: title }));
						getStore(setStore({ response: true }));
					} else {
						getStore(setStore({ response: false }));
					}
				});
			},
			getTodo: () => {
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${getStore().activeTitle}`)
					.then(res => res.json())
					.then(response => getStore(setStore({ todoList: response })));
			},
			addItem: newItem => {
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${getStore().activeTitle}`, {
					method: "PUT",
					body: JSON.stringify(newItem),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(() => getActions().getTodo());
			},
			editItem: updateArr => {
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${getStore().activeTitle}`, {
					method: "PUT",
					body: JSON.stringify(updateArr),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(() => getActions().getTodo());
			},
			deleteItem: element => {
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${getStore().activeTitle}`, {
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
