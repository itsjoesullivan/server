var Req = require('../index').Req;

var testData = " GET / HTTP/1.1\n" +
"Host: localhost:8080\n" +
"Connection: keep-alive\n" +
"Cache-Control: max-age=0\n" +
"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\n" +
"User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.12 Safari/537.36\n" +
"Accept-Encoding: gzip,deflate,sdch\n" +
"Accept-Language: en-US,en;q=0.8\n" +
"Cookie: asdf";

describe('Req', function() {
	var req;
	
	it('exists', function() {
		expect(typeof Req).toBe('function');
	});
	
	it('constructs a Req', function() {
		var req = new Req(testData);
		expect(req instanceof Req).toBe(true);
	});
	
	it('sets first argument to this.path', function() {
		var req = new Req(testData);
		expect(req.path).toBe('/');
	});
});