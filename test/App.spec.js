var App = require('../index').App;
var Req = require('../index').Req;
var Res = require('../index').Res;
var Socket = require('./lib/socket.mock');
var socket = new Socket();

describe('App', function() {
	var req;
	
	it('exists', function() {
		expect(typeof App).toBe('function');
	});
	
	
	it('constructs an App', function() {
		var app = new App();
		expect(app instanceof App).toBe(true);
	});
	
	describe('App.get', function() {
		it('adds second argument to App.routes with first arg as key', function() {
			var app = new App();
			app.get('hi','there');
			expect(app.routes['hi']).toBe('there');
		});
	});
	
	describe('App.routes', function() {
		it('exists', function() {
			var app = new App();
			expect(typeof app.routes).toBe('object');
		});
	});
	
	describe('App.handler', function() {
		it('seeks an appropriate route handler and executes it', function() {
			var app = new App();
			var served = false;
			app.routes['*'] = function() {
				served = true;
			};
			app.handle('*');
			expect(served).toBe(true);
		});
		
		/*it('returns false if it does not find a match', function() {
			var app = new App();
			app.routes['*'] = function() {
				served = true;
			};
			expect(app.handle('notThere')).toBe(false);
		});*/
	});
	
	describe('App.listen', function() {
		it('applies the router to the socket', function() {
			var app = new App();
			var served = false;
			app.routes['*'] = function() {
				served = true;
			};
			expect(typeof app.socket.handler).toBe('undefined');
			app.listen(123);
			expect(typeof app.socket.handler).toBe('function');
		});
	});
	
	it('Handles requests when they match', function() {
		var app = new App();
		var served = false;
		app.get('hello!', function(req,res) {
			expect(req instanceof Req).toBe(true);
			expect(res instanceof Res).toBe(true);
			served = true;
		});
		app.listen(123);
		app.socket.trigger('hello!');
		expect(served).toBe(true);
	});
	
	/*it('sets first argument to this.path', function() {
		var req = new Req('path');
		expect(req.path).toBe('path');
	});*/
});