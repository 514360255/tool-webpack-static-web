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
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: {
        main: './src/static/js/main.ts',
        index: './src/static/js/index.ts',
        customized: './src/static/js/customized.ts',
        medium: './src/static/js/medium.ts',
        extension: './src/static/js/extension.ts',
        article: './src/static/js/article.ts'
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
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            title: '首页',
            chunks: ['main', 'index']
        }),
        new htmlWebpackPlugin({
            template: './src/customized.html',
            filename: 'customized.html',
            title: '定制开发',
            chunks: ['main', 'customized']
        }),
        new htmlWebpackPlugin({
            template: './src/medium.html',
            filename: 'medium.html',
            title: '广告媒介',
            chunks: ['main', 'medium']
        }),
        new htmlWebpackPlugin({
            template: './src/extension.html',
            filename: 'extension.html',
            title: '运营推广',
            chunks: ['main', 'extension']
        }),
        new htmlWebpackPlugin({
            template: './src/article.html',
            filename: 'article.html',
            title: '详情页',
            chunks: ['main', 'article']
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/src/static/images/',
            to: './static/images/'
        }])
    ]
};
