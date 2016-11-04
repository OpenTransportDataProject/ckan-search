/* eslint-disable */
var path = require('path');
module.exports = {
  output: {
    path: __dirname + '/../public',
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../'),
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json', '.css', '.png']
  },
  module: {
    loaders: [
      {
        include: /\.json$/,
        loaders: ['json-loader']
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'], exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
      }
    ]
  }
};
