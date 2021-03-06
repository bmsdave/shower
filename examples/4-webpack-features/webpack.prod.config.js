const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
    entry: {
        bundle: [path.join(__dirname, 'src', 'index.js')]
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: [/vendors/, /node_modules/],
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("css-loader?importLoaders=1&sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=true")
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("css-loader?sourceMap")
            },
            {
                test: /\.html/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(png|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader",
                options: {
                    name: "assets/img/[name].[ext]"
                }
            },
            {test: /\.svg$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=assets/fonts/[name].[ext]'},
            {
                test: /\.woff$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.woff2$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff2&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.[ot]tf$/,
                loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=assets/fonts/[name].[ext]'
            },
            {
                test: /\.eot$/,
                loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject&name=assets/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: "production"
            }
        }),
        new ExtractTextPlugin("index.css"),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.svg$|\.eot$|\.[ot]tf$|\.woff2$|\.woff$|\.js$|\.css$/,
            threshold: 40,
            minRatio: 0.8
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                pure_funcs: ['console.log', 'window.console.log.apply']
            }
        })
    ]
};
