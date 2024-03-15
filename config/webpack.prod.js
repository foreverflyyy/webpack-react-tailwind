const {merge} = require("webpack-merge");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const common = require("./webpack.common");

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    module: {
        rules: [
            {
                test: /\.(css|scss)$/, // Обработка CSS файлов
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[contenthash].css',
            chunkFilename: 'styles/[name].[id].[contenthash].css',
            ignoreOrder: false
        }),
        new HtmlWebpackPlugin({
            template: './public/template.html',
            favicon: './public/favicon.ico',
            hash: true
        }),
        new webpack.SourceMapDevToolPlugin({
            exclude: ['/node_modules/'],
        }),
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin(), '...'],
        runtimeChunk: 'multiple',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|axios|redux|react-redux)[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
})