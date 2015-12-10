var express = require('express');
var app = express();
var globSync = require('glob').sync;
var mocks = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
var proxies = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);
var bodyParser = require('body-parser');
var morgan  = require('morgan');
var livereload = require('connect-livereload');
var child_process = require('child_process');

// live reload setting
app.use(livereload());

// serving static files
var APP_NAME = 'app-name';
var includeBower = process.env.MOCK_SERVER_INCLUDE_BOWER === 'true';
var appPath = process.env.MOCK_SERVER_APP_SOURCE ? process.env.MOCK_SERVER_APP_SOURCE.split(',') : [];
var routeConfig = {
  base: '/api/v1'
};

appPath.forEach(function(path) {
  app.use('/' + APP_NAME, express.static(path));
});
if (includeBower) {
  app.use('/bower_components', express.static('bower_components'));
}

// for payload
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Log proxy requests
app.use(morgan('dev'));

// for sub directories
mocks.forEach(function(route) { route(app, routeConfig); });
proxies.forEach(function(route) { route(app, routeConfig); });

var server = app.listen(3500, function() {
    var port = server.address().port;
    var url = 'http://localhost:' + port + '/' + APP_NAME + '/';
    console.log('Mock-Server listening at ' + url);
    child_process.spawn('open', [url]);
});
