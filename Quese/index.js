let kue = require('kue');
let express = require('express');
let kueUiExpress = require('kue-ui-express');
let queuingRoute = require('./app/routes/queuing-routes');
let queue = kue.createQueue();
let app = express();

kueUiExpress(app, '/kue/', '/kue-api/');
// Mount kue JSON api
app.use('/kue-api/', kue.app);
app.use('/queuing-mechanism', queuingRoute);

app.listen(3000, function (err) {
    console.log("server started at 3000");
});