const express = require('express');
const app = express();
const logger = require('./winstonLogger');
const bodyParser = require('body-parser');
const winston = require('winston');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', __dirname + '\\web');
app.set('view engine', 'ejs');

var server = app.listen(3003, function() {
    var log = logger.createLogger('./log/winstonLog.log');
    log.info('server started at 3003', { status: 200 });
    log.error('server started', { status: 200, operation: "export", customer: "gofer" });

});

app.get('/', function(req, res) {
    var log = logger.createLogger('./log/winstonLog.log');
    log.info('request made to server', { status: 404, message: "request timed out", details: { operation: "import", recType: "item" } });
    res.send('got something');
});