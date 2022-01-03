const path = require('path');
const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
    // use object keys and reducer to create a nice object of env vars
    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    // standard config for webpack
    const config = {
        entry: path.resolve(__dirname, 'src/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/[name].[contenthash].js',
            clean: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                favicon: path.resolve(__dirname, 'public/favicon.ico'),
                template: path.resolve(__dirname, 'public/index.html'),
                filename: 'index.html'
            }),
            new CleanWebpackPlugin(),
            new DefinePlugin(envKeys)
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

    // if application is in development mode
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
                target: process.env.DOCKER_HOST_URL
                    ? process.env.DOCKER_HOST_URL
                    : 'http://localhost:4000'
            }
        };
    }

    // if application moves into production mode
    if (argv.mode === 'production') {
        config.mode = env.WEBPACK_BUILD && argv.mode;
        config.plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash].css',
                chunkFilename: 'css/[id].css'
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
                        name: 'vendor',
                        filename: 'js/[name].[contenthash].js',
                        chunks: 'all'
                    }
                }
            }
        };
    }
    return config;
};
