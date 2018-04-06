const express = require('express');
const app = express();
const logger = require('./logger');
var bodyParser = require('body-parser');
const bunyan = require('bunyan');
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
    //app.use(express.bodyParser());

var openWeather = require('./routes/openWeatherApi');
app.use(express.static('public'));
app.set('views', __dirname + '\\web');
app.set('view engine', 'ejs');

var server = app.listen(3000, function() {
    var log = logger.createLogger('server', 'start');
    log.info('initiating server');
    //console.log("weather app started at port 3000");
});

app.use('/openweather', openWeather);

app.get('/', function(req, res) {
    var log = logger.createLogger('server', 'get /');
    //log.info('initiating server');
    log.error('get call to /');
    res.render('index');
});

app.post('/testpost', function(req, res) {
    res.write('you posted:\n');
    res.end(JSON.stringify(req.body));
});

app.get('/ejslayout', function(req, res) {
    var nsTeam = [
        { name: 'Waleed', team: 'support' },
        { name: 'Amin', team: 'SCA' },
        { name: 'Ahmed', team: 'product' }
    ];
    var title = "NS TEAM!!!";
    res.render('dynamic', { teamInfo: nsTeam, header: title });
});

app.get('/general', function(req, res) {
    var itemObject = {
        id: '123',
        type: 'invent',
        price: '12$',
        extractPrice: function(a) {
            log.info('extractPrice func');
        },
        loadRecord: function(b) {
            log.info('loadrecord func');
        }
    }


    var genLog = logger.createLogger('general', 'general', './log/general.log');
    genLog.info({ operation: 'export', logReport: itemObject }, 'general issue');
    genLog.error('write to file gen');
    res.end('getting close');
});

app.get('/order', function(req, res) {
    var orderObj = {
        name: logger.SERIALIZERS.SALESORDER,
        id: 'SO123',
        type: 'Pending',
        lineItems: [
            { id: 1, sku: 'sku1' },
            { id: 2, sku: 'sku2' }
        ],
        extractPrice: function(a) {
            log.info('extractPrice func');
        },
        loadRecord: function(b) {
            log.info('loadrecord func');
        }
    }
    var orderLog = logger.createLogger(logger.SERIALIZERS.SALESORDER, 'import', './log/sales.log');
    //orderLog.info({ operation: 'import', logReport: orderObj }, 'order sync failed');
    orderLog.error('write to file SO');
    res.end('getting close to order');
});

app.get('/item', function(req, res) {
    var itemObject = {
        name: logger.SERIALIZERS.ITEM,
        id: '123',
        type: 'invent',
        price: '12$',
        extractPrice: function(a) {
            log.info('extractPrice func');
        },
        loadRecord: function(b) {
            log.info('loadrecord func');
        }
    }
    var itemLog = logger.createLogger(logger.SERIALIZERS.ITEM, 'import', './log/items.log');
    itemLog.info({ operation: 'import', logReport: itemObject }, 'order sync failed');
    //itemLog.error('write to file item');
    res.end('getting close to item');
});