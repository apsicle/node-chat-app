var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('Should generate the correct message object', () => {
		var message = generateMessage('admin', 'you are bootiful');
		expect(message).toInclude({
			from: 'admin',
			text: 'you are bootiful'
		});
		expect(message.createdAt).toBeA('number');
	});
});

describe('generateLocationMessage', () => {
	it('Should generate correct location object', () => {
		var message = generateLocationMessage('admin', 12, -45);
		expect(message).toInclude({
			from: 'admin',
			url: `https://www.google.com/maps?q=12,-45`
		});
		expect(message.createdAt).toBeA('number');
	});
});