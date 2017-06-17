/**
 * Created by jyot on 6/5/17.
 */
'use strict';

const Aedes = require('aedes'),
    ws = require('websocket-stream'),
    redisMq = require('mqemitter-redis'),
    redis = require('./lib/tools/redis').client,
    redisUtil = require('./lib/utils/redisUtil'),
    logger = require('./lib/tools/logger');

const port = 1883, wsPort = 8883;

const mq = redisMq({
    port: 6379,
    host: 'localhost'
});

const aedes = Aedes({mq: mq});
const server = require('net').createServer(aedes.handle);
const wsServer = require('http').createServer();

ws.createServer({server: wsServer}, aedes.handle);

wsServer.listen(wsPort, function () {
    logger.info('Aedes websocket server listening on port', wsPort);
});

server.listen(port, function () {
    logger.info('Aedes server listening on port', port);
});

aedes.on('client', function (client) {
    logger.debug('new client', client.id);
});

aedes.on('clientDisconnect', async function (client) {
    const multi = redis.multi();
    multi.srem(redisUtil.USERNAME, client.id);
    multi.hdel(redisUtil.ACTIVE_CHAT, client.id);
    await multi.exec();
    logger.debug('disconnect', client.id);
});