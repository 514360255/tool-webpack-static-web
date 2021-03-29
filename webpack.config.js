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
            template: `./src/pages/${currentFile}.html`,
            filename: `${currentFile}.html`,
            minify: {
                removeComments: true
            },
            inject: 'body',
            favicon: favicon ? favicon : null,
            meta: meta,
            chunks: ['common', isFile ? currentFile : null]
        })
    )
}

Glob.sync('./src/pages/*.html').forEach(item => {
    const p = item.replace(/(\.html)$/, '');
    const splitPath = p.split('/');
    const currentFile = splitPath.pop();
    const jsFilePath = `${p.replace(/(pages)/, 'static/js')}.ts`;
    const isFile = exitsFile(jsFilePath);
    if(isFile) files.entry[currentFile] = jsFilePath;
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
        loader: 'pxToRem/index.js',
        options: {
            remUnit: 750,
            remAllTranslate: false
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
                use: isDev ? cssRule : ExtractTextPlugin.extract({use: scssRule, publicPath: '../css'})
            },
            {
                test: /\.(sass|scss)$/,
                use: isDev ? scssRule : ExtractTextPlugin.extract({use: scssRule})
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
        new copyWebpackPlugin([{
            from: __dirname + '/src/static/images/',
            to: './static/images/'
        }])
    ]
};

module.exports = config;
