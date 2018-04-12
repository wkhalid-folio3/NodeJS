"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./logger').Log;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


/*
Currently unneccesary
app.use(express.static('public'));
app.set('views', __dirname + '\\web');
app.set('view engine', 'ejs');
*/

app.get('/', (req, res) => {
    logger.debug({ operation: 'get /', logDetails: { a: 1, b: 2, c: 3 } }, 'call to get /');
    res.end('Hi there');
});
app.post('/post', (req, res) => {
    logger.info({ operation: "post", logDetails: req.body }, 'data posted');
});
app.listen(process.env.npm_package_config_port, () => {
    logger.info({ operation: 'initiate', logDetails: process.env }, 'Server started');
    //logger.debug({ operation: 'initiate', logDetails: process.env }, 'Server started2');
    //logger.error({ operation: 'initiate', logDetails: { a: 1, b: 2, c: 3 } }, 'Server started2');
});