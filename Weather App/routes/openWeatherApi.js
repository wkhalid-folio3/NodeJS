var express = require('express');
const request = require('request');
// var app = express();
var router = express.Router();
var bodyParser = require('body-parser');

const http = require('http');
const ApiKey = '6a63f2bf893e2ad8c5e30c9a19f7ae51';
const ApiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=' + ApiKey;

const options = {
    url: ApiUrl,
    method: 'GET'
}

router.get('/about', function(req, res) {
    res.render("openWeather\\about");
});

router.get('/weather', function(req, res) {
    request.get(ApiUrl, { json: true }, function(err, resp, body) {
        console.log('/weather');
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            res.send(JSON.stringify({ error: err }));
            return console.log(err);
        }
        //console.log(res);
        res.send(JSON.stringify(body));
        console.log('response sent');
    });
});

router.get('/weather/:city', function(req, res) {
    request.get(ApiUrl + '&q=' + req.params.city, function(err, resp, body) {
        console.log('/weather/city');
        res.setHeader('Content-Type', 'application/json');
        if (err) {
            res.send(JSON.stringify({ error: err }));
            return console.log(err);
        }
        //console.log(res);
        res.send(body);
        console.log('response sent');
    });
    //res.send(JSON.stringify(req.params));
});
module.exports = router;