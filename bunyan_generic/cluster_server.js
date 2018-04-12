const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');
const logger = require('./logger').Log;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let sendMessageToMaster = (msg) => {
    process.send({
        message: msg,
        pid: process.pid
    });
}
let receiveMessageFromMaster = (msg) => {

}

if (cluster.isMaster) {
    logger.info('master started as : ' + process.pid);

    //spawning as many child workers as many cores there are in the server machine
    for (let i = 0; i < os.cpus().length; i++) {
        const worker = cluster.fork();
        //worker sending the message which is being written by master to log.
        worker.on("message", (msg) => {
            logger.info({ operation: "message receive from worker", logDetails: msg }, 'worker msg');
        });
    }
    logger.info({ master: "pid: " + process.pid }, os.cpus().length + ' process spawned');

} else {
    //make server with workers
    var server = app.listen(3003, function() {
        logger.info('initiating server at worker: ' + process.pid);
        //console.log("weather app started at port 3000");
    });

    app.get('/', (req, res) => {
        logger.info({ operation: "get from worker", logDetails: process.pid }, "worker log");
        process.send({ message: "message from worker", workerID: process.pid });
        res.end('cluster worker :: ' + process.pid);
    });

    app.post('/post', (req, res) => {
        logger.info({ postData: JSON.stringify(req.body) }, 'sending to master');
        logger.error({ operation: 'worker: ' + process.pid, logDetails: req.body }, 'sending to master');
        res.end(JSON.stringify(req.body));
    });
}