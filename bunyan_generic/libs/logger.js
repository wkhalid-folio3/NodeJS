const bunyan = require("bunyan");
const jc = require("json-cycle");
const process = require("process");
class Log {
    anySerializer(Obj) {
        var jsonObj = null;
        if (Obj) {
            jsonObj = jc.decycle(Obj);
        }
        return jsonObj;
    }

    constructor(logPath, isRotating, backupCount, rotatePeriod, rotateFrequency) {

        this.logPath = logPath + "-" + process.pid + ".log";
        var streams = [];
        streams.push({ level: "trace", stream: process.stdout });
        var log = bunyan.createLogger({
            name: "folio-log",
            streams: streams
        });
        log.addSerializers({
            logDetails: this.anySerializer
        });
        if (!!logPath && !!isRotating && (!!backupCount && backupCount > 0) && !!rotatePeriod && !!rotateFrequency) {
            log.addStream({
                name: "rotateFileStream",
                level: "debug",
                //stream: process.stdout,
                type: "rotating-file",
                path: this.logPath,
                period: rotateFrequency + rotatePeriod,
                count: parseInt(backupCount),
            });
        }
        return log;
    }

    setLogPathbyPID() {
        this.logPath = this.logPath + "-" + process.pid + ".log";
    }
}


module.exports = {
    Log: new Log(configs.log.logFolderPath + configs.log.logFileName + ".log",
        configs.log.isRotating,
        configs.log.backupCount,
        configs.log.rotatePeriod,
        configs.log.rotateFrequency)
};