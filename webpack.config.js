const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// save system variable
const isDev = process.env.NODE_ENV === 'development';

//create an optimization object
const optimize = () => {
    const config = {};
    if (!isDev) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ];
    }
    return config;
};

module.exports = {
    //// the 'context' property set the work directory, so we can set the paths below from that directory.
    // If we do not use that property we set the paths from webpack.config.js directory
    context: path.resolve(__dirname, 'src'),
    //mode: 'development', // this config we set in package.json script
    ////// the 'entry' property use to set start files
    entry: ['@babel/polyfill', './index.js', './index.jsx'], // set the entry file for webpack
    ///// if we want to use many starting files we need set entry option as object
    // entry: {
    //  main: './src/index.js',
    //  [_set_file_name]: '_path_to_file',
    // }
    ////// the 'output' property use to set file name and path to directory where webpack will be save result
    output: {
        //filename: 'bundle.js', // default static file name - result: bundle.js
        ////// we can use webpack [name] pattern
        //filename: '[name].js', // result main.js by default
        ////// if we use 'entry' as an object then
        //filename: '[name].bundle.js' // result will be main.bundle.js and _set_file_name.bundle.js
        //// to avoid hashing files on browser we use webpack [hash] pattern
        filename: '[name].[hash].js', // result main._some_hash_.js
        path: path.resolve(__dirname, 'dist'), // set the path to result folder
    },
    //// add extensions to auto import on webpack
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    ///// the 'output' property described what plugins used and their rules
    // in object we can set the params to plugin
    plugins: [
        new HTMLWebpackPlugin({
            //title: 'New project',
            template: './index.html',
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css'
        }),
    ],
    //// the 'module' property described what loaders used and their rules
    module: {
        rules: [
            {
                // parameter 'test' accept a regular expression which describes a file extension
                test: /\.css$/,
                // webpack use loaders from right to left. the right way is important
                // if we do not use MiniCssExtractPlugin set property use like next template
                // use: ['style-loader', 'css-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
                // to use css modules and css import same time
                exclude: /\.module\.css$/,
            },
            {
                // add css.modules to project
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: true
                        }
                    }],
                include: /\.module\.css$/,
            },
            {
                test: /\.s[ac]ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                // used import images file into css
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader'],
            },
            {
                // used import fonts file into css
                test: /\.(ttf|woff|woof2|eot)$/,
                use: ['file-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    }
                },
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    }
                },
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                    }
                },
            },
        ]
    },
    optimization: optimize(),
};