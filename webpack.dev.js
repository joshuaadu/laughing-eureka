const path = require("path")
const webpack = require("webpack")
const HtmlwebPackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const Dotenv = require('dotenv-webpack')


module.exports = {
    mode: 'development',
    devtool: 'source-map',

    // Tell the dev server where to look for files(Using webpack-dev-server)
    devServer: {
           static: './dist', //  tells webpack-dev-server to serve the files from the dist directory on localhost:8080
            },

    entry: './src/client/index.js',

    output: {
        // path: path.resolve(__dirname, 'dist'),

        // webpack.CleanPlugin
        clean: {
            dry: true, // Log the assets that should be removed instead of deleting them.
        },
        libraryTarget: 'var',
        library: 'Client'
    },

    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                 // Load final css file with mini-css-extract plugin
                  MiniCssExtractPlugin.loader,
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              }
        ]
    },

    plugins: [
        new HtmlwebPackPlugin({
            title: 'Using Webpack For Code Development',
            template: './src/client/views/index.html',
            filename: './index.html',
    }),
        // new BundleAnalyzerPlugin(),

        // This extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
        new MiniCssExtractPlugin(),
        new Dotenv(),
    ], 


}