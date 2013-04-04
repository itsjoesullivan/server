var Res = require('../index').Res;
var Socket = require('./lib/socket.mock');

describe('Res', function() {
	var res;
	
	it('exists', function() {
		expect(typeof Res).toBe('function');
	});
	
	
	it('constructs a Res', function() {
		var res = new Res({socket:new Socket(),socketId: 123});
		expect(res instanceof Res).toBe(true);
	});
	
	it('accepts an object like: {socket: Socket, socketId: int}', function() {
		var res = new Res({socket:new Socket(),socketId: 123});
		expect(res.socket instanceof Socket).toBe(true);
		expect(typeof res.socketId).toBe('number');
	});
	
	describe('res.send', function() {
		
	});
});