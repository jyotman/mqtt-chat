/**
 * Created by jyot on 6/5/17.
 */
'use strict';

const path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: ['./public/javascript/index.js'],
    output: {
        path: path.resolve('public'),
        filename: 'javascript/index_bundle.js',
    },
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
            {test: /\.css/, loaders: ['style-loader', 'css-loader'], exclude: /node_modules/}
        ]
    },
    plugins: []
};