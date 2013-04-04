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

Res = function(obj) {
	this.socket = obj.socket;
	this.socketId = obj.socketId;
	this.socketInfo = obj.socketInfo;
	this.writeHandler = obj.writeHandler;
};
Res.prototype.send = function(file) {
	var str2buf = function(str) {
		var buffer = new ArrayBuffer(str.length + 1),
			bufferView = new Uint8Array(buffer);
		for (var i = 0, strLen = str.length; i < strLen; i++) {
			bufferView[i] = str.charCodeAt(i);
		}
		return buffer;
	},
	str2arr = function(string) {
		var buffer = new ArrayBuffer(string.length),
			view = new Uint8Array(buffer);
		for (var i = 0; i < string.length; i++) {
			view[i] = string.charCodeAt(i);
		}
		return view;
	},
	typeMap = {
		'.js': 'application/javascript',
		'.txt.': 'text/plain',
		'.html': 'text/html',
		'.jpg': 'image/jpeg',
		'.jpeg': 'image/jpeg'
	},
	fileBuffer = str2buf(file.data),
	header = str2arr("HTTP:/1.0 200 OK\nContent-length: " + file.data.length + "\nContent-type:" + (typeMap[file.type] || 'text/plain') + '\n\n'),
	outputBuffer = new ArrayBuffer(header.byteLength + fileBuffer.byteLength),
	view = new Uint8Array(outputBuffer);
	view.set(header, 0);
	view.set(new Uint8Array(fileBuffer), header.byteLength);
	var self = this;
	this.writeHandler(outputBuffer);
};

App = function() {
	this.socket = env === 'prod' ? socket : new Socket();
	this.routes = {};
};
App.prototype.get = function(path,cb) {
	this.routes[path] = cb;
};
App.prototype.handle = function(acceptInfo) {
	var self = this;
	var buf2str = function(buffer) {
		var str = '',
			uArrayVal = new Uint8Array(buffer);
		for (var s = 0; s < uArrayVal.length; s++) {
			str += String.fromCharCode(uArrayVal[s]);
		}
		return str;
	};
	this.socket.read(acceptInfo.socketId, function(readInfo) {
		var data = buf2str(readInfo.data);
		var req = new Req(data);
		var res = new Res({
			writeHandler: function(outputBuffer) {
				self.socket.write(acceptInfo.socketId,outputBuffer, function(writeInfo) {
					self.socket.destroy(acceptInfo.socketId);
					self.socket.accept(self.socketInfo.socketId, function() {
						self.handle.apply(self,arguments);
					});
				})
			}
		});
		for(var i in self.routes) {
			var route = i;
			if(minimatch(req.path, route)) {
				return self.routes[i](req,res);
			}
		}
		return false;
	});
	
};
App.prototype.listen = function(port) {
	var self = this;
	this.socket.create("tcp", {}, function(socketInfo) {
		self.socketInfo = socketInfo;
		self.socket.listen(socketInfo.socketId, "127.0.0.1", port, 20, function(result) {
			self.socket.accept(socketInfo.socketId, function() {
				self.handle.apply(self,arguments);
			});
		});
	});
};




switch(env) {
	case 'test':
		if(typeof module !== 'undefined') {
			module.exports = {
				App: App,
				Req: Req,
				Res: Res
			};
		}
		break;
	case 'prod':
		var app = new App();

		app.get('**', function(req,res) {
			spoke({
				verb: 'read',
				noun: req.path
			},function(obj) {
				res.send(obj);
			});
		});

		app.listen(3000);
		break;
}


spoke.register({
	verb: 'read',
	noun: '**'
}, function(req,cb) {
	console.log(arguments);
	if(typeof cb === 'function') {
		cb({
			data: "This is server.",
			name: '.txt'
		})
	}
	
})

