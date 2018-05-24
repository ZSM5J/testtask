var MongoClient = require('mongodb').MongoClient;

var state = {
    db: null
};

exports.connect = function(url, done) {
    if (state.db) {
        return done();
    }

    MongoClient.connect( url, function(err, db) {
        if (!err) {
            console.log("Successfuly connected to database")
            state.db = db;
            done();
        } else {
            return done(err);
        }
    });
}

exports.getDB = function () {
    return state.db;
}
