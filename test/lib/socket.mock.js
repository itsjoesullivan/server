var Socket = function() {};
Socket.prototype = {
	create: function(type,options,cb) {
		var socketInfo = {};
		cb(socketInfo);
	},
	listen: function(id,address,port,something,cb) {
		var status = true;
		cb(status);
	},
	accept: function(id,cb) {
		this.handler = cb;
	},
	read: function(socketId,infoHandler) {
		var mockData = " GET / HTTP/1.1\n" +
		"Host: localhost:8080\n" +
		"Connection: keep-alive\n" +
		"Cache-Control: max-age=0\n" +
		"Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8\n" +
		"User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.12 Safari/537.36\n" +
		"Accept-Encoding: gzip,deflate,sdch\n" +
		"Accept-Language: en-US,en;q=0.8\n" +
		"Cookie: asdf";
		infoHandler(mockData);
	},
	trigger: function(path) {
		return this.handler(path);
	}
};

module.exports = Socket;