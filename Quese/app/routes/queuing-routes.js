let kue = require('kue');
let queue = kue.createQueue();
let express = require('express');
let router = express.Router();

let itemData = [{ id: "1", name: "data1", sku: "sku1" },
{ id: "2", name: "data2", sku: "sku2" },
{ id: "3", name: "data3", sku: "sku3" },
{ id: "4", name: "data4", sku: "sku4" },
{ id: "5", name: "data5", sku: "sku5" },
{ id: "6", name: "data6", sku: "sku6" },
{ id: "7", name: "data7", sku: "sku7" },
{ id: "8", name: "data8", sku: "sku8" },
{ id: "9", name: "data9", sku: "sku9" },
{ id: "10", name: "data10", sku: "sku10" }];


router.get('/', function (req, res) {
    res.send("Failed Response");
});
router.get('/process-items', function (req, res) {
    queue.process('process-items', function (job, done) {
        processItems(job.data, done);
        res.end("Job Processed Successfully");
    });
    res.end("nothing found for processing");

});


router.get('/queue-items', function (req, res) {
    var itemsJson = req.body;
    for (let i = 0; i < itemData.length; i++) {
        let job = queue.create('process-items', itemData[i]);
        job.save(function (err) {
            if (!err) console.log(job.id);
        });
    }
    res.json({ status: true });

});

function processItems(data, done) {
    console.log("JobData ", data);
    done();
}


module.exports = router;