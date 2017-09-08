const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'Jennifer',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Jacquelyn',
			room: 'Node Course'
		}];
	});

	it('Should add new user', () => {
		var users = new Users;
		var user = {
			id: 'asdf',
			name: 'Robin',
			room: 'The Office fans'
		};
		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('Should remove a user', () => {
		var userToRemove = users.users[0];
		var initialLength = users.users.length;
		expect(userToRemove).toEqual(users.removeUser(userToRemove.id));
		expect(users.users.length).toBe(initialLength - 1);
	});

	it('Should not remove a user not in the array', () => {
		var userToRemove = {
			id: 'I am clearly a fake user',
			name: '',
			room: ''
		};
		var initialLength = users.users.length;
		expect(users.removeUser(userToRemove.id)).toNotExist();
		expect(users.users.length).toBe(initialLength);
	});

	it('Should find user', () => {
		var user = users.users[1];
		expect(users.getUser(user.id)).toEqual(user);
	});

	it('Should not find user not in the array', () => {
		var user = {
			id: '',
			name: '',
			room: ''
		}
		expect(users.getUser(user.id)).toNotExist();
	});

	it('should return names for node course', () => {
		var userList = users.getUserList('Node Course');

		expect(userList).toEqual(['Mike', 'Jacquelyn']);
	})

	it('should return names for react course', () => {
		var userList = users.getUserList('React Course');

		expect(userList).toEqual(['Jennifer']);
	})
});