const baseConfig = require('./webpack.config');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');

const prodConfig = {
    mode: 'production',
    plugins: [
        new ExtractTextPlugin('static/css/[name].css', {
            allChunks: false
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessorOptions: {
                mergeLonghand: false,
                discardComments: { removeAll: true }
            },
            canPrint: true,
        }),
        new CleanWebpackPlugin('dist')
    ]
}

module.exports = webpackMerge.merge(baseConfig, prodConfig);
