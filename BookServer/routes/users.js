var express = require('express');
var router = express.Router();
var cors = require('./cors');

/* GET users listing. */
router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
