"use strict";
const bunyan = require('bunyan');

const SERIALIZERS = {
    ITEM: 'item',
    SALESORDER: 'salesorder',
    CUSTOMER: 'customer',
    DEFAULT: 'default'
}

/**
 * customSerializers for different record types. can also be tempered for different operations
 * functions created here are used in customLogs object to initialize logs with specific serialize objects
 */
var customSerializers = {
    serializeItem: function(itemObj) {
        return {
            name: SERIALIZERS.ITEM,
            itemId: itemObj.id,
            type: itemObj.type,
            price: itemObj.price
        }
    },
    serializeSalesOrder: function(salesObj) {
        return {
            name: SERIALIZERS.SALESORDER,
            soId: salesObj.id,
            type: salesObj.type,
            lineItems: salesObj.lineItems
        }
    }
}



var customLogs = {
    createLogger: function(recordType, operation, path, masterPath) {

        var serializerWrapper = function getCustomSerializersByType(object) {
            switch (object.name) {
                case SERIALIZERS.ITEM:
                    return customSerializers.serializeItem(object);
                case SERIALIZERS.SALESORDER:
                    return customSerializers.serializeSalesOrder(object);

                default:
                    return bunyan.stdSerializers.err;
            }
        }

        var streams = [];
        streams.push({ level: 'info', stream: process.stdout });
        if (!!path) {
            streams.push({ level: 'error', type: 'file', path: path });
        }

        var log = bunyan.createLogger({
            name: recordType + ' ' + operation,
            streams: streams
        });

        if (!!masterPath) {
            log.addStream({
                name: "myNewStream",
                //stream: process.stdout,
                type: 'file',
                level: "error",
                path: './log/master.log'
            });
        }

        log.addSerializers({
            response: bunyan.stdSerializers.res,
            logReport: serializerWrapper
        });

        return log;
    },
}

module.exports = {
    createLogger: customLogs.createLogger,
    //createItemlog: customLogs.createItemlog,
    //createOrderLog: customLogs.createSalesOrderLog,
    SERIALIZERS: SERIALIZERS
}