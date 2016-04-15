var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'ng-admin': [
            './src/javascripts/vendors.js',
            './src/javascripts/ng-admin.js',
            './src/sass/ng-admin.scss'
        ],
    },
    output: process.env.NODE_ENV === 'test' ? {
        path: './src/javascripts/test/fixtures/examples/blog/',
        filename: "build/[name].min.js"
    } : {
        publicPath: "http://localhost:8000/",
        filename: "build/[name].min.js"
    },
    module: {
        loaders: [
            { test: /\.js/, loaders: ['babel'], exclude: /node_modules[\\\/](?!admin-config)/ },
            { test: /\.js/, loaders: ['ng-annotate'] },
            { test: /\/angular\.min\.js$/, loader: 'exports?angular' },
            { test: /\.html$/, loader: 'html' },
            { test: /\.(woff2?|svg|ttf|eot)(\?.*)?$/, loader: 'url' },
            { test: /\.css$/, loader: ExtractTextPlugin.extract('css') },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass') }
        ]
    },
    resolve: {
        alias: {
            angular: __dirname + '/node_modules/angular/angular.min.js',
        },
    },
    plugins: [
        new ExtractTextPlugin('build/[name].min.css', {
            allChunks: true
        })
    ]
};
