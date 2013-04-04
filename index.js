
/*app.get('*', function(req,res) {
	spoke({
		verb:'read',
		noun:req.path
	},function(data) {
		res.send(data);
	});
});

app.listen(3000);*/



Req = function(path) {
	this.path = path;
};

Res = function() {
	
};
Res.prototype.send = function() {
	
};

App = function() {};
App.prototype.get = function(path,cb) {
	var req = new Req(path);
	var res = new Res();
	return cb(req,res);
};
App.prototype.routes = [];
App.prototype.handle = function(acceptInfo) {
	//parse for url
	// 
	_(App.prototype.routes).find()
};
App.prototype.listen = function(port) {

	var self = this;
	socket.create("tcp", {}, function(socketInfo) {
		socket.listen(socketInfo.socketId, "127.0.0.1", port, 20, function(result) {
			console.log("LISTENING:", result);
			socket.accept(socketInfo.socketId, self.handle);
		});
	});

	
};