/**
 * Created by jyot on 3/6/17.
 */
'use strict';

const winston = require("winston");

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: 'debug',
            timestamp: function () {
                return (new Date()).toISOString();
            },
            stderrLevels: ['error', 'warn'],
            // handleExceptions: true,
            // json: true,
            colorize: true
        })
    ]
});

module.exports = logger;