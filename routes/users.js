var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:myUser', function(req, res, next) {
  res.send("myUser is set to " + req.params.myUser);
});

module.exports = router;
