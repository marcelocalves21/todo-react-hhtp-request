const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			listTitle: [],
			activeTitle: "",
			todoList: [],
			checkItem: "",
			response: true
		},
		actions: {
			getUsers: () => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marceloapiusers")
					.then(res => res.json())
					.then(response => getStore(setStore({ listTitle: response })));
			},
			createUser: title => {
				let lowerCaseTitle = title.toLowerCase();
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${lowerCaseTitle}`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify([]),
					redirect: "follow"
				}).then(res => {
					if (res.ok) {
						getStore(setStore({ response: true }));
						getActions().addUser(lowerCaseTitle);
					} else {
						getStore(setStore({ response: false }));
					}
				});
			},
			addUser: user => {
				let newUser = getStore().listTitle;
				newUser = [...newUser, { label: user, done: false }];
				fetch("https://assets.breatheco.de/apis/fake/todos/user/marceloapiusers", {
					method: "PUT",
					body: JSON.stringify(newUser),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(getStore(setStore({ activeTitle: user })))
					.then(getActions().getTodo());
			},
			setActiveTitle: title => {
				getStore(setStore({ activeTitle: title }));
				getActions().getTodo();
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
			},
			deleteList: user => {
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/${user}`, {
					method: "DELETE"
				});
			},
			updateUserslist: delUser => {
				fetch(`https://assets.breatheco.de/apis/fake/todos/user/marceloapiusers`, {
					method: "PUT",
					body: JSON.stringify(delUser),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(res => {
					res.ok ? alert("User deleted") : alert("something went wrong");
				});
			}
		}
	};
};

export default getState;
