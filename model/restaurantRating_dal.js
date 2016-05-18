var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    var qry = "SELECT * from RestaurantRating;"
    connection.query(qry, function(err, result) {
        callback(err, result);
    });
}

exports.GetByID = function(RestaurantID, callback) {
    console.log(RestaurantID);
    var query = 'SELECT * FROM RestaurantRating WHERE RestaurantID=' + RestaurantID;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};

exports.Insert = function(RestaurantID, Rating, Comments, CustomerID, callback) {
    var qry = "INSERT INTO RestaurantRating (RestaurantID, Rating, Comments, CustomerID) VALUES (?, ?, ?, ?)";
    connection.query(qry, [RestaurantID, Rating, Comments, CustomerID], function(err, result){
        callback(err, result);
    });
}

exports.GetByNumber = function(Number, callback) {
    console.log(Number);
    var query = 'SELECT * FROM RestView HAVING AverageRating >' + Number;
    console.log(query);
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
             }
            callback(false, result);
            }
    );
};

