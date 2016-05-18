var express = require('express');
var router = express.Router();

var restaurantsDal = require('../model/restaurants_dal');
var restaurantRatingDal = require('../model/restaurantRating_dal');

router.get('/', function(req, res, next) {
    restaurantsDal.GetAll(function (err, result) {
        if (err) {
            res.send("Error: " + err);
        }
        else {
            res.render('user/userRatingForm.ejs', {rs: result});
        }
    });
});

router.post('/insert_rating', function(req, res) {
    console.log(req.body);
    restaurantRatingDal.Insert(req.body.RestaurantID, req.body.Rating, req.body.Comments, req.session.account.CustomerID ,
        function(err) {
            if(err) {
                res.send('Fail!<br />' + err);
            } else {
            res.send('Success!')
            }
        });
});

module.exports = router;