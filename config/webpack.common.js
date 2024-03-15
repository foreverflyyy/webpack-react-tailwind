const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[fullhash].bundle.js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.md'],
        alias: {
            '@': path.resolve(__dirname, '../src/client'),
            '@resources': path.resolve(__dirname, '../src/resources'),
            stream: 'stream-browserify',
            path: 'path-browserify',
        },
    },
    module: {
        rules: [
            {
                test: /\.js(x?)$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/inline',
            },
            {
                test: /\.md$/,
                type: 'asset/source',
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../public'),
                globOptions: {
                    ignore: [
                        './template.html',
                        './favicon.ico'
                    ]
                }
            }]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].bundle.css',
            chunkFilename: '[id].css'
        }),
    ],
};