var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

//var myImage = require(helpers.root('./src/img/map.png'));
//var myImage2 = require("/src/img/worx.png");

module.exports = {
  entry: {
    'polyfills' : './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts',
    'style': './src/scss/main.scss'
  },

  resolve: {
    extensions: ['.ts', '.js','.scss']
  },

  module: {
    rules: [
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: helpers.root('src', 'tsconfig.json') }
          } , 'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
        query: {
          name: 'assets/img/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('./src'), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['polyfills', 'app', 'vendor']
    }),

    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
