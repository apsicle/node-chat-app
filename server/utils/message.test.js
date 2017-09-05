var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
	it('Should the correct message object', () -> {
		var message = generateMessage('admin', 'you are bootiful');
		expect(message).toInclude({
			from: 'admin',
			text: 'you are bootiful'
		});
		expect(message.createdAt).toBeA('number');
	})
})