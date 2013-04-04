var Socket = require('./socket.mock');

describe('socket', function() {
	var socket = new Socket();
	beforeEach(function() {
	    socket = new Socket();
	  });
	it('exists', function() {
		expect(typeof socket).toBe('object');
	});
	
	describe('accept', function() {
		it('sets second argument to socket.handler', function() {
			expect(typeof socket.handler).toBe('undefined');
			socket.accept('hi','there');
			expect(socket.handler).toBe('there');
		});
	});
	describe('trigger', function() {
		it('runs handler given the arguments', function() {
			socket.accept('hi', function(val) {
				return val;
			});
			expect(socket.trigger('test')).toBe('test');
		});
	});
	describe('read', function() {
		it('accepts a socket id and returns the request data to the handler', function() {
			var data;
			socket.read(1,function(obj) {
				expect('data' in obj).toBe(true);
				expect('resultCode' in obj).toBe(true);
			});
			//expect(typeof data).toBe('string');
		});
	})
});