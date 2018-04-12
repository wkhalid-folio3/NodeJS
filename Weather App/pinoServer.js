const express = require('express');
const bodyParser = require('body-parser');
const pino = require('pino-2')();
const logger = require('./logger');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', __dirname + '\\web');
app.set('view engine', 'ejs');

app.listen(3009, function() {
    var log = new logger.log('./log/pino-info.log', './log/pino.log');
    var x = log.error({ message: "server initiated at 3009" }, 'server start');
    log.info({ returnedLog: JSON.stringify(x) }, "received log");
})