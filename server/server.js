var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var ObjectID = require('mongodb').ObjectID
var dbURL = "mongodb://Root:root123@ds131800.mlab.com:31800/toydb"
var port = 7755;
var cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

db.connect(dbURL, function(err) {
    if (err) {
        console.log("Can't connect to db" + err);
    }
})



app.get('/', function(req, res) {
    res.send('api works')
})

app.post('/users/new', function(req, res) {
    var user = {
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        hobby: req.body.hobby,
        film: req.body.film,
        isAdmin: req.body.isAdmin
    }
    db.getDB().collection('testuser').findOne({username: req.body.username}, function(err, result) {
        if (result) {
            res.status(500).send( "user exists");
        } else {
            db.getDB().collection('testuser').insert(user, function(err, result){
                if (err) {
                    console.log(err);
                    return res.sendStatus(500);
                }
                res.send(user);
            });
        }
    });
    
})

app.get('/users', function(req, res) {
    db.getDB().collection('testuser').find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})

app.get('/users/:id', function(req, res) {
    db.getDB().collection('testuser').findOne({_id: ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc)
    })
})

app.put('/users/:id', function(req, res) {
    db.getDB().collection('testuser').updateOne({_id: ObjectID(req.params.id)},
     {$set: {
        age: req.body.age,
        hobby: req.body.hobby,
        film: req.body.film,
        isAdmin: req.body.isAdmin
    }}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send("Updated.")
    })
})

app.delete('/users/:id', function(req, res) {
    db.getDB().collection('testuser').deleteOne({_id: ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send("Deleted.")
    })
})

app.post('/login', function(req, res) {
    db.getDB().collection('testuser').findOne({username: req.body.username, password: req.body.password}, function(err, result) {
        if (result) {
            res.send(result);
        } else {
            res.status(500).send( "user is not found");
        }
    });
})

app.post('/questions/new', function(req, res) {
    var question = {
        username: req.body.username,
        topic: req.body.topic,
        date: req.body.date,
        text: req.body.text,
        answer: req.body.answer
    }

    db.getDB().collection('questions').insert(question, function(err, result){
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(question);
    });
   
})

app.get('/questions', function(req, res) {
    db.getDB().collection('questions').find().toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})

app.get('/questions/:id', function(req, res) {
    db.getDB().collection('questions').findOne({_id: ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(doc)
    })
})

app.get('/questions/user/:username', function(req, res) {
    db.getDB().collection('questions').find({username: req.params.username}, {}).toArray(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send(docs)
    })
})

app.put('/questions/:id', function(req, res) {
    db.getDB().collection('questions').updateOne({_id: ObjectID(req.params.id)},
     {$set: {
        answer: req.body.answer
    }}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send("Updated.")
    })
})

app.delete('/questions/:id', function(req, res) {
    db.getDB().collection('questions').deleteOne({_id: ObjectID(req.params.id)}, function(err, doc) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        res.send("Deleted.")
    })
})

app.listen(port, function() {
    console.log('server started at port ' + port)
})