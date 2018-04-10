const express = require('express');
const app = express();
const logger = require('./logger');
var bodyParser = require('body-parser');
const bunyan = require('bunyan');
const cluster = require('cluster');
const os = require('os');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', __dirname + '\\web');
app.set('view engine', 'ejs');

let sendMessageToMaster = (msg) => {
    process.send({
        message: msg,
        pid: process.pid
    });
}
let receiveMessageFromMaster = (msg) => {

}
if (cluster.isMaster) {
    var log = logger.createLogger('master', 'start', './log/master.log');
    log.info('master started : ' + process.pid);

    for (let i = 0; i < os.cpus().length; i++) {
        const worker = cluster.fork();
        worker.on('message', (msg) => {
            var log = logger.createLogger('master', 'receive', './log/master.log');
            log.error({ receivingmessage: msg }, 'message receiveid from worker ' + worker.id);
            log.info({ msg: 'message received' }, 'sending to worker');
            worker.send({ status: true });
        });
    }
    log.error(os.cpus().length + ' process spawned');
} else {

    //enabling message receiving channel
    process.on('message', (msg) => {
        var log = logger.createLogger('worker', 'receive', './log/worker.log');
        log.error({ operation: 'msg frm master', logReport: msg });
    });

    //make server with workers
    var server = app.listen(3006, function() {
        var log = logger.createLogger('server', 'start');
        log.info('initiating server at worker: ' + process.pid);
        //console.log("weather app started at port 3000");
    });

    app.post('/post', (req, res) => {
        var log = logger.createLogger('worker', 'send', './log/worker.log');
        log.info({ postData: JSON.stringify(req.body) }, 'sending to master');
        log.error({ operation: 'msg to master', postData: JSON.stringify(req.body) }, 'sending to master');
        sendMessageToMaster(req.body);
        res.end(JSON.stringify(req.body));
    });
}