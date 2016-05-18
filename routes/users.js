var express = require('express');
var router = express.Router();

/* GET users listing. */
var usersDal = require('../model/users_dal');

router.get('/all', function(req, res) {
  usersDal.GetAll(function(err, result) {
      if (err) throw err;
      res.render('user/displayAllUsers.ejs', {rs: result});
      }
  );
});


router.get('/', function(req, res) {
    console.log(req.query.CustomerID);
    if(req.query.CustomerID == null) {
        res.redirect('/users/all')
    }
    else {
        usersDal.GetByID(req.query.CustomerID, function (err, result) {
                if (err) {
                    res.send("Error: " + err);
                    return;
                }
                console.log(result);
                res.render('user/displayUserInfo.ejs', {rs: result, CustomerID: req.query.CustomerID});
            }
        );
    }
});


router.get('/new', function(req, res) {
    res.render('authentication/signup.ejs');
});

router.get('/users_insert', function(req, res){
    usersDal.Insert(req.query.FirstName, req.query.LastName, req.query.Username, req.query.Email, req.query.Password, function(err, result){
        var response = {};
        if(err) {
            response.message = err.message;
        }
        else {
            response.message = 'Success!';
        }
        res.json(response);
    });
});




module.exports = router;