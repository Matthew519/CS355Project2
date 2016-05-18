var mysql = require('mysql');
var db = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback) {
    connection.query('SELECT * FROM Restaurant;',
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

exports.GetByID = function(RestaurantID, callback) {

    console.log(RestaurantID);
    var query = 'SELECT * FROM RestaurantInfoView WHERE RestaurantID=' + RestaurantID;
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

exports.Insert = function(Name, Cuisine, City, Street, State, Zip, PhoneNumber, callback) {
    var values = [Name, Cuisine];
    connection.query('INSERT INTO Restaurant (Name, Cuisine) VALUES (?, ?)', values,
        function(err, result){
            if(err == null) {
                var address_qry_values = [];
                address_qry_values.push(result.insertId, City, Street, State, Zip, PhoneNumber);
                console.log(address_qry_values);

                connection.query('INSERT INTO RestaurantAddress (RestaurantID, City, Street, State, Zip, PhoneNumber) VALUES (?, ?, ?, ?, ?, ?)', address_qry_values, function (err, address_result) {
                    callback(err);

                });
            }
            else {
                callback(err);
            }
        });
}

exports.GetByName = function(Name, callback) {
    var query = 'CALL GetRestaurant(?)';
    var query_data = [Name];

    connection.query(query, query_data, function(err, result) {
            callback(err, result[0]);
    });
}
