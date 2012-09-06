var application_root = __dirname,
    express  = require('express'),
    path     = require('path'),
    mongoose = require('mongoose');

var app = express();

// model
mongoose.connect('mongodb://localhost/climbr');

var Area = mongoose.model('Area', new mongoose.Schema({
    name: String,
    numberOfProblems: String,
    rock: String,
    approach: String,
    difficulty: {
        sport: {
            french: String,
            british: String
        },
        trad: String,
        boulder: {
            font: String,
            hueco: String
        },
        dws: String
    },
    loc: [Number, Number],
    order: Number
}));

var Route = mongoose.model('Route', new mongoose.Schema({
    name: String,
    area: String,
    section: String,
    style: String,
    beta: String,
    grade: {
        sport: {
            french: String,
            british: String
        },
        trad: String,
        boulder: {
            font: String,
            hueco: String
        },
        dws: String
    },
    stars: Number,
    ticked: Boolean,
    loc: [Number, Number],
    order: Number
}));

app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, "public")));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.get('/', function(req, res) {

});

app.get('/api/areas', function(req, res) {
    var lowerLeft  = [parseFloat(req.query.ll[0]), parseFloat(req.query.ll[1])];
    var upperRight = [parseFloat(req.query.ur[0]), parseFloat(req.query.ur[1])];

    return Area.find().where('loc').within.box({ll: lowerLeft, ur: upperRight})
    .exec(function(err, area) {
        if (!err) {
            return res.json(area);
        }
    });
});

app.get('/api/areas/:id', function(req, res) {
    return Area.findById(req.params.id, function(err, area) {
        if (!err) {
            return res.json(area);
        }
    });
});

app.put('/api/areas/:id', function(req, res) {
    return Area.findById(req.params.id, function(err, area) {
        area.text = req.body.text;
        area.done = req.body.done;
        area.order = req.body.order;
        return area.save(function(err) {
            if (!err) {
                console.log("updated");
            }
            return res.json(area);
        });
    });
});

app.post('/api/areas', function(req, res) {
    var area;
    area = new Area({
        text: req.body.text,
        done: req.body.done,
        order: req.body.order
    });
    area.save(function(err) {
        if (!err) {
            return console.log("created");
        }
    });
    return res.json(area);
});

app.delete('/api/areas/:id', function(req, res) {
    return Area.findById(req.params.id, function(err, area) {
        return area.remove(function(err) {
            if (!err) {
                console.log("removed");
                return res.json('')
            }
        });
    });
});

app.listen(3000);