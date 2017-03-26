const webpack  = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');

const NODE_ENV = process.env.NODE_ENV || 'development';

function addHash(template, hash) {
  return NODE_ENV !== 'development' ?
    template.replace(/\.[^.]+$/, '.[${hash}]$&') : template;
}

module.exports = {
  entry: {
    vkBundle: './vk',
    indexBundle: './index',
  },
  context: `${__dirname}/static_src`,
  output: {
    path: `${__dirname}/static/build`,
    filename: addHash('[name].js', 'chunkhash'),
    publicPath: '/static/build',
    library: '[name]',
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleTracker({ filename: './webpack-stats.json' }),
  ],

  module: {
    rules: [
      {
        test: /\.{js|jsx}$/,
        include: `${__dirname}/static_src`,
        loader: 'babel-loader?presets[]=react&presents[]=es2015&presets',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded',
      },
      {
        test: /\.{png|jpg|gif|svg|ttf|eot|woff|woff2}$/,
        loader: 'url-loader?limit=4096&&name=[path][name].[ext]',
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
    ]
  },
  resolve: {
    modules: ['/static_src', 'node_modules'],
    extensions: ['.js', '.jsx', '.css'],
  },
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['.loader.js', '.js', '.css']
  },
  watch: NODE_ENV === 'development',
  watchOptions: {
    aggregateTimeout: 100,
  },

  devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map': false,
};

if (NODE_ENV !== 'development') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    })
  )
}
