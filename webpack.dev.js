const path = require('path');

const baseConfig = require('./webpack.config');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        index: 'index.html',
        hot: true,
        hotOnly: true,
        publicPath: '/',
        overlay: true,
        open: true,
        liveReload: true,
        contentBase: [path.join(__dirname, './src'), path.join(__dirname, './dist')],
        watchContentBase: true,
        port: 8888
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

module.exports = webpackMerge.merge(baseConfig, devConfig);
