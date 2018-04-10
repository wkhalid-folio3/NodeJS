const winston = require('winston');
const config = winston.config;
let createLogger = (filePath) => {
    var log = new(winston.Logger)({

        transports: [
            new(winston.transports.File)({
                level: "info",
                name: 'infologs',
                filename: './log/winston-info.log'
            }),
            new(winston.transports.Console)({
                timestamp: function() {
                    return Date.now();
                },
                formatter: function(options) {
                    // - Return string will be passed to logger.
                    // - Optionally, use options.colorize(options.level, <string>) to
                    //   colorize output based on the log level.
                    return options.timestamp() + ' ' +
                        config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                        (options.message ? options.message : '') +
                        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
                },
                level: "info",
                name: "infoStreamConsole",
            }),
            new(winston.transports.Console)({
                timestamp: function() {
                    return Date.now();
                },
                formatter: function(options) {
                    // - Return string will be passed to logger.
                    // - Optionally, use options.colorize(options.level, <string>) to
                    //   colorize output based on the log level.
                    return options.timestamp() + ' ' +
                        config.colorize(options.level, options.level.toUpperCase()) + ' ' +
                        (options.message ? options.message : '') +
                        (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
                },
                level: "error",
                name: 'errorLog',
                filename: "./log/winston-error.log"
            })
        ]
    });

    return log;
}

module.exports = {
    createLogger: createLogger
}