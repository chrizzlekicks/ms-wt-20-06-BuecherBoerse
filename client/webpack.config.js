const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src/index.js'),
        path.resolve(__dirname, 'src/index.scss')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'kodebi_main.bundle.js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'public')
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
        proxy: {
            context: ['/auth', '/api'],
            target: 'http://localhost:4000'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 2,
                            modules: false
                        }
                    },
                    {
                        loader: 'resolve-url-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            {
                test: /\.(?:ico|gif|png|jpe?g)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/,
                type: 'asset/inline'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'kodebi_styles.bundle.css' }),
        new CleanWebpackPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [new CssMinimizerPlugin(), '...']
    }
};
