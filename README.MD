#server

A server for spoke.

	app.get('*',function(req,res) {
			spoke({
				verb: 'read',
				noun: req.path
			}, res.send);
		});
	});
