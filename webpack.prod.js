const path = require("path")
const webpack = require("webpack")
const HtmlwebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin')
const Dotenv = require('dotenv-webpack')
// Just like optimize-css-assets-webpack-plugin but more accurate with source maps and assets using query string, allows to cache and works in parallel mode.
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")


module.exports = {
    mode: 'production',
    entry: './src/client/index.js',
    output: {
        clean: {
            dry: true
        },
        libraryTarget: 'var',
        library: 'Client'
    },
    optimization: {
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()]
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
                  
                  // Creates `style` nodes from JS strings
                  // "style-loader",

                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              }
        ],
        
    },
    plugins: [
        new HtmlwebPackPlugin({
        template: './src/client/views/index.html',
        filename: './index.html',
        }),
    // This extracts CSS into separate files. It creates a CSS file per JS file which contains CSS
        new MiniCssExtractPlugin(),

        // Setup offline Support with Workbox
        new WorkboxPlugin.GenerateSW(
            {
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
                clientsClaim: true,
                skipWaiting: true,
            }
        ),
        new Dotenv(),
    ]

}