[{
	id: '/fewfewfwe',
	name: 'Ryan',
	room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
	constructor () {
		this.users = [];
	}
	addUser (id, name, room) {
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}
	removeUser (id) {
		var userIndex = this.users.findIndex((user) => {
			return user.id === id;
		});
		if (userIndex != -1) {
			return this.users.splice(userIndex, 1)[0];			
		}

		return null;
	}
	getUser (id) {
		var user = this.users.find((user) => {
			return user.id === id;
		})
		if (user) {
			return user;
		}
		
		return null;
	}
	getUserList(room) {
		// filter full userlist, keep elements where element.room === room
		var users = this.users.filter((user) => user.room === room);

		// create an array from this filtered list, keeping only the names of the users.
		var namesArray = users.map((user) => user.name);

		return namesArray;		
	}
}

module.exports = {Users};

// this refers to instance in constructor and class methods
// class Person {
// 	constructor (name, age) {
// 		this.name = name;
// 		this.age = age;
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} years old.`;
// 	}
// }

// var me = new Person('cluck', 'erino');
// console.log(me.getUserDescription());