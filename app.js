let express = require('express');
let app = express();

let orm = require('orm');
let bodyParser = require('body-parser');

let urlencodedParser = bodyParser.urlencoded({extended: true});

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.static('./public')); //设置静态文件目录，保证css和js的加载

app.use(orm.express(`sqlite:///${__dirname}/database.db`, {
    define: function (db, models, next) {
        models.User = db.define('user', {
            id : Number,
            username : String
        });
        models.Type = db.define('type', {
            id : Number,
            name : String
        });
        models.Item = db.define('item', {
            id : Number,
            name : String,
            typeId : Number,
            unit : String,
            carbonFoot : Number
        });
        models.CarbonInfo = db.define('carbonInfo', {
            id : Number,
            itemId : Number,
            amount : Number,
            userId : Number
        });
        next();
    }
}));

app.post('/data', urlencodedParser, function (req, res) {
    req.models.User.create({ username : req.body.username }, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            let carbonFootList = req.body.carbonFootList;
            for (let carbonFoot of carbonFootList) {
                req.models.CarbonInfo.create({ itemId : carbonFoot.item.id, amount : carbonFoot.amount, userId : result.id }, function (err, result) {
                    if (err) {
                        console.log(err)
                    } else {

                    }
                })
            }
            res.sendStatus(200);
        }
    })
});

app.get('/type', function (req, res) {
    req.models.Type.find({}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
});

app.get('/item', function (req, res) {
    req.models.Item.find({}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
});

app.get('/user', function (req, res) {
    req.models.User.find({}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
});

app.get('/carbonInfo', function (req, res) {
    req.models.CarbonInfo.find({}, function (err, result) {
        if (err) {
            console.log(err)
        } else {
            res.send(result);
        }
    })
});

app.get('/database', function (req, res) {
    res.sendFile(`${__dirname}/database.db`);
});

let server = app.listen(8081, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});