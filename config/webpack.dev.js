const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {merge} = require("webpack-merge");

const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        hot: true,
        open: true,
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                include: path.resolve(__dirname, '../', 'src'),
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ],
            },
        ],
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            '/api': 'http://localhost:5000',
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
            favicon: "./public/favicon.ico"
        }),
    ],
})