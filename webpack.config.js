/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/2/27
 */

const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        _$: './src/static/js/_$/_$.ts'
    },
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.(tsx?)$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            },
            {
                test: /\.(jsx?)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }
            },
            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                      {loader: 'css-loader'},
                      {loader: 'postcss-loader'}
                  ],
                  publicPath: '../css'
              })

            },
            {
                test: /\.(sass|scss)$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:[{
                        loader:"css-loader"
                    },{
                        loader:"sass-loader"
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit: 10000,
                            name: 'images/[name].[ext]',
                            publicPath: '../',
                            outputPath: 'static/'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.jsx', '.tsx']
    },
    plugins: [
        new CleanWebpackPlugin('dist'),
        new ExtractTextPlugin('static/css/[name].css'),
        new htmlWebpackPlugin({
            template: './src/view/index.html',
            filename: 'index.html',
            title: 'demo',
            chunks: ['_$']
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/src/static/images/',
            to: './static/images/'
        }])
    ]
};
