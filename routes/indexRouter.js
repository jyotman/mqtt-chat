'use strict';

const express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile('public/views/index.html', {root: __dirname + '/../'});
});

module.exports = router;
