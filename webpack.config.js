/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/2/27
 */

const path = require('path');
const Glob = require('glob');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const faviconPath = './src/static/images/favicon.ico';
const isDev = process.env.NODE_ENV === 'development'
const meta = {
    'X-UA-Compatible': 'IE=edge,chrome=1',
    'renderer': 'webkit',
    'flexible': 'initial-dpr=1',
    'apple-mobile-web-app-capable': 'yes',
    'apple-touch-fullscreen': 'yes',
    'format-detection': 'telephone=no,address=no',
    'apple-mobile-web-app-status-bar-style': 'white',
}
const files = {
    entry: {},
    htmlPage: []
};

const exitsFile = (p) => {
    return fs.existsSync(path.resolve(__dirname, p));
}

const handleHtmlPage = (currentFile, isFile) => {
    const favicon = exitsFile(faviconPath);
    files.htmlPage.push(
        new htmlWebpackPlugin({
            template: `./src/pages/${currentFile}/index.html`,
            filename: `${currentFile}.html`,
            minify: {
                removeRedundantAttributes:true, // 删除多余的属性
                collapseWhitespace:true, // 折叠空白区域
                removeAttributeQuotes: true, // 移除属性的引号
                removeComments: true, // 移除注释
                collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
            },
            inject: 'body',
            favicon: favicon ? favicon : null,
            meta: meta,
            chunks: ['common', isFile ? currentFile : null]
        })
    )
}

Glob.sync('./src/pages/**/index.html').forEach(item => {
    const splitPath = item.split('/');
    splitPath.pop();
    const currentFile = splitPath[splitPath.length - 1];
    if(currentFile === 'common' || currentFile === 'components') return;
    const jsFileName = `${splitPath.join('/')}/index.ts`;
    const isFile = exitsFile(jsFileName);
    if(isFile) files.entry[currentFile] = jsFileName;
    handleHtmlPage(currentFile, isFile);
});

const cssRule = [
    {loader: 'css-loader'},
    {loader: 'postcss-loader'}
];

const scssRule = [
    {loader:"css-loader"},
    {loader:"sass-loader"},
    {
        loader: 'pxToVw/index.js',
        options: {
            translateMedia: true
        }
    }
];

if(isDev) {
    cssRule.unshift('style-loader');
    scssRule.unshift('style-loader');
}

const config = {
    entry: {
        common: './src/static/js/common.ts',
        ...files.entry
    },
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        modules: ['node_modules', 'loaders']
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
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test: /\.css$/,
                use: isDev ? cssRule : ExtractTextPlugin.extract({fallback: 'style-loader', use: scssRule, publicPath: '../css'})
            },
            {
                test: /\.(sass|scss)$/,
                use: isDev ? scssRule : ExtractTextPlugin.extract({fallback: 'style-loader', use: scssRule})
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use:[
                    {
                        loader:'url-loader',
                        options: {
                            limit: 10000,
                            name: 'static/images/[name].[ext]',
                            publicPath: '../'
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
        ...files.htmlPage,
        new ExtractTextPlugin('static/css/[name].css', {
            allChunks: false
        }),
        new copyWebpackPlugin([{
            from: __dirname + '/src/static/images/',
            to: './static/images/'
        }])
    ]
};

module.exports = config;
