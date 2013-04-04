
/*app.get('*', function(req,res) {
	spoke({
		verb:'read',
		noun:req.path
	},function(data) {
		res.send(data);
	});
});

app.listen(3000);*/

if(typeof module !== 'undefined') {
	var Socket = require('./test/lib/socket.mock');
}



Req = function(reqData) {
	if(!reqData) {
		throw "No request data";
	}
	
	var data = reqData.split('\n');
	var path = /GET (.*) HTTP\/1\.1/.exec(data[0])[1];
	this.path = path;
	
};

Res = function() {
};
Res.prototype.send = function() {};

App = function() {
	this.socket = new Socket();
	this.routes = {};
};
App.prototype.get = function(path,cb) {
	this.routes[path] = cb;
};
App.prototype.handle = function(acceptInfo) {
	//parse for url
	// 
	for(var i in this.routes) {
		var route = i;
		if(acceptInfo === i) {
			
			return this.routes[i](acceptInfo);
		}
	}
	return false;
};
App.prototype.listen = function(port) {
	var self = this;
	this.socket.create("tcp", {}, function(socketInfo) {
		self.socket.listen(socketInfo.socketId, "127.0.0.1", port, 20, function(result) {
			self.socket.accept(socketInfo.socketId, function() {
				self.handle.apply(self,arguments);
			});
		});
	});
};

if(typeof module !== 'undefined') {
	module.exports = {
		App: App,
		Req: Req,
		Res: Res
	};
}