var Res = require('../index').Res;

describe('Res', function() {
	var res;
	
	it('exists', function() {
		expect(typeof Res).toBe('function');
	});
	
	
	it('constructs a Res', function() {
		var res = new Res();
		expect(res instanceof Res).toBe(true);
	});
});