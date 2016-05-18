var express = require('express');
var router = express.Router();

var restaurantsDal = require('../model/restaurants_dal');
var restaurantRatingDal = require('../model/restaurantRating_dal');
var restaurantDal = require('../model/restaurant_dal');


router.get('/all', function(req, res) {
    restaurantsDal.GetAll(function(err, result) {
            if (err) throw err;
            res.render('restaurant/displayAllRestaurants.ejs', {rs: result});
        }
    );
});

router.get('/', function(req, res) {
    console.log(req.query.RestaurantID);
    if(req.query.RestaurantID == null){
        res.redirect('/restaurants/all')
    }
    else {
        restaurantsDal.GetByID(req.query.RestaurantID, function (err, result) {
                if (err) {
                    res.send("Error: " + err);
                    return;
                }
                console.log(result);
                res.render('restaurant/displayRestaurantInfo.ejs', {rs: result, RestaurantID: req.query.RestaurantID});
            }
        );
    }
});

router.get('/new', function(req, res) {
    res.render('restaurant/insertRestaurantForm');
});

router.get('/restaurantInsert', function(req, res){
    console.log(req.query);
    restaurantsDal.Insert(req.query.Name, req.query.Cuisine, req.query.Street, req.query.City, req.query.State, req.query.Zip, req.query.PhoneNumber,
        function(err) {
            if(err) {
                res.send('Fail!<br />' + err);
            }
            else {
                res.send('Success!');
            }
    });
});

// Search for restaurants with a rating greater than user input
router.get('/top', function(req, res) {
    restaurantRatingDal.GetAll(function (err, result) {
        if (err) {
            res.send("Error: " + err);
        }
        else {
            res.render('restaurant/topRestaurants.ejs', {rs: result});
        }
    });
});
router.get('/ratings', function(req, res) {
    console.log(req.query.Number);
    restaurantRatingDal.GetByNumber(req.query.Number, function(err, result) {
        if (err) {
            res.send('Error: ' + err);
        }
        else {
            res.render('restaurant/displayTopRestaurants.ejs', {rs: result, Num: req.query.Number});
        }
    });
});

router.get('/search', function(req, res){
    res.render('restaurant/searchRestaurants.ejs');
});

router.get('/results', function(req, res) {
    console.log(req.query.Name);
    restaurantsDal.GetByName(req.query.Name, function(err, result) {
        if(err) {
            res.send('Error: ' + err);
        }
        else {
            res.render('restaurant/searchResults.ejs', {rs: result});
        }
    });
});

module.exports = router;