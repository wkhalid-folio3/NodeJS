const pino = require('pino-2');
const models = require('./models');
const fs = require('fs');

const CONSTANTS = {
    SALESORDER: 'SalesOrder',
    ITEM: 'Item',
}
class Serializers {
    static itemSerializer(itemObj) {
        return {
            sku: itemObj.itemId,
            description: itemObj.description || 'not found',
            priceLevels: [{
                    qty: itemObj.priceTier[0].qty,
                    price: itemObj.priceTier[0].price
                },
                {
                    qty: itemObj.priceTier[1].qty,
                    price: itemObj.priceTier[1].price
                }
            ]
        }
    }

    static salesOrderSerializer(salesObj) {
        return {
            orderId: salesObj.tranid,
            salesdate: salesObj.date,
            customer: salesObj.entity,
            lineitems: salesObj.lineitems,
            priceInfo: salesObj.priceInfo
        }
    }
}

class customLog {

    static getSerializerByObject(obj) {
        switch (obj.name) {
            case CONSTANTS.SALESORDER:
                return Serializers.itemSerializer(obj);
            case CONSTANTS.ITEM:
                return Serializers.itemSerializer(obj);
        }
    }

    constructor(logPath, CentralPath) {
        this.logPath = logPath;
        this.centralPath = CentralPath;
        var pinoLog = pino({
            browser: {
                asObject: true,
                serialize: true,
                serializers: {
                    logReport: customLog.getSerializerByObject,
                },
                write: (o) => {
                    aaaaaaaaaa
                }
            }
        })
        return pinoLog;
    }
}





module.exports = {
    MODELS: models,
    log: customLog
}