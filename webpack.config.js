const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    //// the 'context' property set the work directory, so we can set the paths below from that directory.
    // If we do not use that property we set the paths from webpack.config.js directory
    context: path.resolve(__dirname, 'src'),
    //mode: 'development', // this config we set in package.json script
    ////// the 'entry' property use to set start files
    entry: './index.js', // set the entry file for webpack
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
    ///// the 'output' property described what plugins used and their rules
    // in object we can set the params to plugin
    plugins: [
        new HTMLWebpackPlugin({
            //title: 'New project',
            template: './index.html',
        }),
        new CleanWebpackPlugin(),
    ],
    //// the 'module' property described what loaders used and their rules
    module: {
        rules: [
            {
                // parameter 'test' accept a regular expression which describes a file extension
                test: /\.css$/,
                // webpack use loaders from right to left. the right way is important
                use: ['style-loader', 'css-loader'],
            },
        ]
    }
};