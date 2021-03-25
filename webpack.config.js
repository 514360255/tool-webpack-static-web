/**
 * Created by sunshine(514360255@qq.com)
 * User: sunshine
 * Date: 2019/2/27
 */

const path = require('path');
const Glob = require('glob');
const fs = require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const favicon = './src/static/images/favicon.ico';
const meta = {
    'viewport': 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
    // 'X-UA-Compatible': 'ie=edge',
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
    files.htmlPage.push(
        new htmlWebpackPlugin({
            template: `./src/pages/${currentFile}.html`,
            filename: `${currentFile}.html`,
            minify: {
                removeComments: true
            },
            inject: 'body',
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

console.log(files);

module.exports = {
    entry: {
        common: './src/static/js/common.ts',
        ...files.entry
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
        ...files.htmlPage,
        new copyWebpackPlugin([{
            from: __dirname + '/src/static/images/',
            to: './static/images/'
        }])
    ]
};
