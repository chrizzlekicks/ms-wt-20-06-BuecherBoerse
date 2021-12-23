const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    let config = {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                favicon: path.resolve(__dirname, 'public/favicon.ico'),
                template: path.resolve(__dirname, 'public/index.html'),
                filename: 'index.html'
            }),
            new CleanWebpackPlugin()
        ],
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
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
        }
    };
    if (argv.mode === 'development') {
        config.mode = env.WEBPACK_SERVE && argv.mode;
        config.module.rules.push({
            test: /\.scss$/i,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        sourceMap: true,
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
        });
        config.devServer = {
            static: {
                directory: path.resolve(__dirname, 'public')
            },
            compress: true,
            port: 3000,
            hot: true,
            open: true,
            historyApiFallback: true,
            proxy: {
                context: ['/auth', '/api'],
                target: 'http://localhost:4000'
            }
        };
    }
    if (argv.mode === 'production') {
        config.mode = env.WEBPACK_BUILD && argv.mode;
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
                chunkFilename: '[id].css'
            })
            // new BundleAnalyzerPlugin()
        );
        config.module.rules.push({
            test: /\.scss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2,
                        sourceMap: true,
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
        });
        config.optimization = {
            minimize: true,
            minimizer: [new CssMinimizerPlugin(), '...'],
            moduleIds: 'deterministic',
            runtimeChunk: 'single',
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                    }
                }
            }
        };
    }
    return config;
};
