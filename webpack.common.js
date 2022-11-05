const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const TerserPlugin = require("terser-webpack-plugin"); 


module.exports = {
    entry: {
        popup: path.resolve('src/popup/popup.tsx'),
        options: path.resolve('src/options/options.tsx'),
        background: path.resolve('src/background/background.ts'),
        contentScript: path.resolve('src/contentScript/contentScript.ts'),
        setting: path.resolve('src/popup/setting.tsx'),
        home: path.resolve('src/popup/home.tsx'),
    },
    devtool: 'inline-source-map',
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx?$/,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                          importLoaders: 1,
                        },
                    },
                    {
                    loader: 'postcss-loader', // postcss loader needed for tailwindcss
                    options: {
                      postcssOptions: {
                        ident: 'postcss',
                        plugins: [tailwindcss, autoprefixer],
                      },
                    },
                },
              ],
            },
            {
                type: 'assets/resource',
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg)$/,
            },
        ]
    },
    "plugins": [
        new CleanWebpackPlugin({
            cleanStaleWebpackAssets: false
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve('src/static'),
                to: path.resolve('dist')
            }]
        }),
        new CopyPlugin({
            patterns:[{
                from: path.resolve('server'),
                to:path.resolve('dist')
            }]
        }),
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        ...getHtmlPlugins([
            'popup',
            'home',
            'setting',
            'options'
        ])
    ],
    resolve: {
        extensions: ['.tsx', '.js', '.ts'],
        fallback: {
            buffer: require.resolve('buffer/'),
        }
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    }
}

function getHtmlPlugins(chunks){
    return chunks.map(chunk => new HtmlPlugin({
        title: 'SagiousPass',
        filename: `${chunk}.html`,
        chunks: [chunk]
    }))
}