const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const merge = require('merge');
const webpackConfig = require('./webpack.config.init.js');

module.exports = merge(webpackConfig, {
    
    cache: false,
    
    output: {
        path: path.resolve(__dirname,  '../backend/static'),
        filename: 'scripts/main-[id]-[fullhash].js',
        publicPath: '/',
        clean: true,
    },
    
    module: {
        rules: [
            {
                test: /\.(tsx|jsx|ts|js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: path.resolve(__dirname, './babel.config.js'),
                        },
                    },
                ],
                exclude: [
                    path.resolve(__dirname, '**/dist'),
                    path.resolve(__dirname, 'node_modules'),
                    path.resolve(__dirname, 'dist'),
                ],
            },

            {
                test: /\.s?[ac]ss$/i,
                exclude: /\.module\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    plugins: [
        new Dotenv(),
        new BundleTracker({
            path: path.join(__dirname, '../bundles'),
            filename: 'webpack-stats.json',
        }),
        new webpack.SourceMapDevToolPlugin({
            test: /\.tsx?$/,
            filename: '[file].map.[query]',
            include: path.resolve(__dirname, '../bundles'),
            columns: true,
        }),
        
        new MiniCssExtractPlugin({
            filename: 'styles//[name].css',
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js', '.svg'],
        plugins: [new TsconfigPathsPlugin()],
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            '@interfeces': path.resolve(__dirname, 'src/interfaces.ts'),
            "@redux/Slice": path.resolve(__dirname, "src/redux/features"),
            '@Component': path.resolve(__dirname, 'src/components'),
        },
    },
});
