var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Customer;',
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            console.log(result);
            callback(false, result);
        }
    );
}

exports.GetByID = function(CustomerID, callback) {
    console.log(CustomerID);
    var query = 'SELECT * FROM CustomerInfoView WHERE CustomerID=' + CustomerID;
    console.log(query);
    connection.query(query, function(err, result) {
        if(err) {
            console.log(err);
            callback(true);
            return;
        }
        callback(false, result);
    }
    );
}

exports.Insert = function(FirstName, LastName, Username, Email, Password, callback) {
    var values = [FirstName, LastName, Username, Email, Password];
    connection.query('INSERT INTO Customer (FirstName, LastName, Username, Email, Password) VALUES (?, ?, ?, ?, ?)', values,
        function(err, result){
        callback(err, result);
    });
}