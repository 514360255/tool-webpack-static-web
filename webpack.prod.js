const baseConfig = require('./webpack.config');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackMerge = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin({
            verbose: true
        })
    ]
}

module.exports = webpackMerge.merge(baseConfig, prodConfig);
