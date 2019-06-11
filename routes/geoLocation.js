var express = require('express');
var router = express.Router();
var db = require('../apis/queries');

var distance = require('../apis/distance');
var popular = require('../apis/popular');

router.get('/distance', function (req, res) {
  distance(req.query.source, req.query.destination, function (response) {
    // if(error) console.log(error);
    res.send(200, { distance: response });
  });
});

router.get('/popularsearch', function (req, res) {
  popular(1,function (response) {
    // if(error) console.log(error);
    res.send(200, response[0]);
  });
});

router.get('/popularsearchlist', function (req, res) {
  popular(10, function (response) {
    // if(error) console.log(error);
    res.send(200, response);
  });
});

module.exports = router;