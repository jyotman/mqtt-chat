'use strict';

const express = require('express'),
    redis = require('../lib/tools/redis').client,
    redisUtil = require('../lib/utils/redisUtil'),
    router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const usernameExists = await redis.sismember(redisUtil.USERNAME, req.body.username);
        if (usernameExists === 0) {
            await redis.sadd(redisUtil.USERNAME, req.body.username);
            res.send({success: true});
        }
        else
            res.send({success: false});
    } catch (err) {
        next(err);
    }
});

router.post('/chat', async (req, res, next) => {
    try {
        const multi = redis.multi();
        multi.sismember(redisUtil.USERNAME, req.body.chatWithUsername);
        multi.hget(redisUtil.ACTIVE_CHAT, req.body.chatWithUsername);
        const result = await multi.exec();
        if (result[0][1] === 0)
            res.send({error: 'The username you want to chat with does not exist.'});
        else if (result[1][1] !== null && result[1][1] !== req.body.username)
            res.send({error: 'The username you want to chat with is chatting with someone else.'});
        else {
            await redis.hmset(redisUtil.ACTIVE_CHAT, req.body.chatWithUsername, req.body.username, req.body.username, req.body.chatWithUsername);
            res.send({success: true});
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;