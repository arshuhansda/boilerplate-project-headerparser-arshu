// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

const requestIp = require('request-ip');

// inside middleware handler
const ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    next();
};

// on localhost you'll see 127.0.0.1 if you're using IPv4 
// or ::1, ::ffff:127.0.0.1 if you're using IPv6
app.use(requestIp.mw())


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/whoami", function (req, res) {
  var ipAddress = req.clientIP;
  var lang = req.acceptsLanguages();
  var sw = req.get('User-Agent');
  res.json({
    ipaddress: ipAddress,
    language: lang[0],
    software: sw
  });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
