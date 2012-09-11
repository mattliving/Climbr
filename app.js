var application_root = __dirname,
    express  = require('express'),
    path     = require('path'),
    mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/climbr');

var Area = mongoose.model('Area', new mongoose.Schema({
    name: String,
    numberOfProblems: String,
    rock: String,
    approach: String,
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
    loc: [Number, Number]
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

/* Build the typeahead source array from the names of the areas and routes. 
   Two queries and another loop through the data array - needs optimization. */
app.get('/api/typeahead', function(req, res) {
    var source = [];

    return Area.find({}, {name: 1, _id: 0}).exec(function(err, area) {
        if (!err) {
            return Route.find({}, {name: 1, _id: 0}).exec(function(err, route) {
                if (!err) {
                    var data = area.concat(route);
                    for (var i in data) {
                        source.push(data[i]['name']);
                    }
                    return res.send(source);
                }
                else console.log(err);
            })
        }
        else console.log(err);
    })
});

app.get('/api/areas', function(req, res) {
    var lowerLeft  = [parseFloat(req.query.ll[0]), parseFloat(req.query.ll[1])];
    var upperRight = [parseFloat(req.query.ur[0]), parseFloat(req.query.ur[1])];

    return Area.find().where('loc').within.box({ll: lowerLeft, ur: upperRight})
    .exec(function(err, area) {
        if (!err) {
            return res.json(area);
        }
        else console.log(err);
    });
});

app.get('/api/areas/:id', function(req, res) {
    return Area.findById(req.params.id, function(err, area) {
        if (!err) {
            return res.json(area);
        }
    });
});

app.get('/api/routes', function(req, res) {
    return Route.find().where('area').equals(req.query.area)
    .exec(function(err, route) {
        if (!err) {
            return res.json(route);
        }
        else console.log(err);
    });
});

app.put('/api/routes/:id', function(req, res) {
    console.log(req);
    return Route.findById(req.params.id, function(err, route) {
        route.ticked = req.body.ticked;
        return route.save(function(err) {
            if (!err) {
                console.log("updated");
            }
            return res.json(route);
        });
    });
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