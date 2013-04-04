var str2buf = function(str) {
	var buffer = new ArrayBuffer(str.length + 1),
		bufferView = new Uint8Array(buffer);
	for (var i = 0, strLen = str.length; i < strLen; i++) {
		bufferView[i] = str.charCodeAt(i);
	}
	return buffer;
}

var buf2str = function(buffer) {
	var str = '',
		uArrayVal = new Uint8Array(buffer);
	for (var s = 0; s < uArrayVal.length; s++) {
		str += String.fromCharCode(uArrayVal[s]);
	}
	return str;
};


/*app.get('*', function(req,res) {
	spoke({
		verb:'read',
		noun:req.path
	},function(data) {
		res.send(data);
	});
});

app.listen(3000);*/

var env = (typeof module !== 'undefined') ? 'test' : 'prod';

switch(env) {
	case 'test':
		var Socket = require('./test/lib/socket.mock');
		break;
	case 'prod':
		socket = chrome.experimental.socket || chrome.socket;
		break
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
	this.socket = env === 'prod' ? socket : new Socket();
	this.routes = {};
};
App.prototype.get = function(path,cb) {
	this.routes[path] = cb;
};
App.prototype.handle = function(acceptInfo) {
	var self = this;
	this.socket.read(acceptInfo.socketId, function(readInfo) {
		var data = buf2str(readInfo.data);
		var req = new Req(data);
		var res = new Res();
		//parse for url
		// 
		console.log('looking in routes',self.routes,req);
		for(var i in self.routes) {
			var route = i;
			if(route = req.path) {
				return self.routes[i](req,res);
			}
		}
		return false;
	});
	
};
App.prototype.listen = function(port) {
	console.log('listen');
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

var app = new App();

app.get('/', function(req,res) {
	console.log(req,res);
	console.log('yo!');
});

app.listen(3000);

