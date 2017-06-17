'use strict';

const express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    redis = require('./lib/tools/redis').client,
    logger = require('./lib/tools/logger'),
    redisUtil = require('./lib/utils/redisUtil'),
    mqttBroker = require('./mqtt-broker');

const indexRouter = require('./routes/indexRouter'),
    userRouter = require('./routes/userRouter');

const app = express();

redis.on('connect', () => {
    logger.info('Clearing existing connections data');
    redis.del(redisUtil.USERNAME);
    redis.del(redisUtil.ACTIVE_CHAT);
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send({error: err});
});

module.exports = app;