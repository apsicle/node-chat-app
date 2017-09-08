const expect = require('expect');

// import isRealString
const {isRealString} = require('./validation');

// isRealString
describe('isRealString', () => {
	it('should reject non-string values', () => {
		var res = isRealString(98);
		expect(res).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var res = isRealString('     ');
		expect(res).toBe(false);
	});

	it('should accept real string values', () => {
		var res = isRealString('lmao cluckeroni')
		expect(res).toBe(true);
	});
});