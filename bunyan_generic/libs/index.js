var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = {
    Log: require('./logger').Log,
    express: app,
    bodyParser: bodyParser,
    configs: require('./configs')
}