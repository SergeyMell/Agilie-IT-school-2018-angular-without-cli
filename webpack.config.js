const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, args) => {

    const prodMode = args.hasOwnProperty('production');

    return {
        mode: prodMode ? 'production' : 'development',
        entry: {
            app: './src/main.ts',
                polyfills: './src/polyfill.ts'
        },
        resolve: {
            extensions: ['.js', '.ts', '.scss']
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: ['awesome-typescript-loader', 'angular2-template-loader']
                },
                {
                    test: /\.scss$/,
                    exclude: path.join(__dirname, 'src/app/assets'),
                    loaders:
                        ['to-string-loader', 'css-loader', 'sass-loader']
                },
                {
                    test: /\.scss$/,
                    include: path.join(__dirname, 'src/app/assets'),
                    loaders:
                        [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.(png|svg|gif)$/,
                    loaders: ['url-loader']
                }
            ]

        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                chunks: ['polyfills', 'app'],
                chunksSortMode: 'manual'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].[hash].css'
            }),
            new CleanWebpackPlugin(['dist'])
        ],
            output: {
            filename: '[name].[hash].js'
        }
    }
};