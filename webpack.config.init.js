const path = require('path');

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
    
    cache: false,
    entry: {
        index: {
            import: 'src/index.ts',
            dependOn: 'shared',
        },
        // https://webpack.js.org/guides/code-splitting/#entry-dependencies
        another: {
            import: './src/map/another-module.ts',
            dependOn: 'shared',
        },
        shared: 'lodash',
    },

    // https://webpack.js.org/guides/code-splitting/#entry-dependencies
    optimization: {
        runtimeChunk: 'single',
        // minimize: false,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false, // out all comments
                    },
                },
                extractComments: false, // dont save comments in separate files
            }),
        ],
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            files: path.resolve(__dirname, 'src/'),
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.jsx', '.ts', '.js', '.svg'],
        plugins: [new TsconfigPathsPlugin()],
        modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            '@interfeces': path.resolve(__dirname, 'src/interfaces.ts'),
            // reduxToolkit: path.resolve(__dirname, 'src/reduxs'),
            // pictures: path.resolve(__dirname, 'src/pictures'),
            '@pages': path.resolve(__dirname, 'src/app'),
        },
    },
};
