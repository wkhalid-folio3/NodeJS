const express = require('express');
const app = express();
const logger = require('./winstonLogger');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', __dirname + '\\web');
app.set('view engine', 'ejs');

var server = app.listen(3000, function() {
    var log = logger.createLogger('./log/winstonLog.log');
    log.info('server started', { status: 200 });
    log.error('server started', { status: 200 });

});