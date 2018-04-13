"use strict";
global.configs = require('./libs/configs');
const libs = require('./libs');
const logger = libs.Log;
const app = libs.express;

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
app.listen(configs.server.port, () => {
    //console.log(JSON.stringify(configs));
    logger.info({ operation: 'initiate', logDetails: configs }, 'Server started');
    //logger.debug({ operation: 'initiate', logDetails: process.env }, 'Server started2');
    //logger.error({ operation: 'initiate', logDetails: { a: 1, b: 2, c: 3 } }, 'Server started2');
});