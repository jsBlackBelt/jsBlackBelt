var http = require('http');
//var request = require('request');
//var app = require('express'); // ???

var port = 9000;
//var port = process.env.VCAP_APP_PORT || 8080;
console.log ('the portnumber is:   '+ port);

http.createServer(function(request, response, next) {
	console.log ('request url:   ' + request.url) ;
	if (request.url.match("")) {
	//if (request.headers.origin.match("/datamanagement/a/**")) {
		var proxy = http.createClient(8080, "sanity");
		request.headers['Authorization'] = 'Basic c3VwZXJ1c2VyOnN1c2Vy';
		var proxy_request = proxy.request(request.method, request.url, request.headers);
		proxy_request.on('response', function (proxy_response) {
			proxy_response.pipe(response);
			response.writeHead(proxy_response.statusCode, proxy_response.headers);
			console.log(proxy_response.statusCode);
		});

		request.pipe(proxy_request);
    } else {
		//next();
		response.end("<OK>");
	}
}).listen(port);