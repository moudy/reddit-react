import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const isProduction = process.env.NODE_ENV === 'production';
const devOrigin = 'http://localhost:8080/';
const scssLoaders = ['css-loader', 'autoprefixer-loader?browsers=last 2 versions', 'sass-loader'];
const PublicPath = isProduction ? 'http://cdn.example.com/assets/' : devOrigin;
const JSFilename = isProduction ? 'app.[hash].js' : 'app.js';
const CSSFilename = isProduction ? '[name].[hash].css' : '[name].css';
const AppEntry = ['./index.js'];

let plugins = [
  new ExtractTextPlugin(CSSFilename),
  new HtmlWebpackPlugin({ template: './app/index.html' })
];

if (isProduction) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
  plugins.push(new webpack.optimize.DedupePlugin());
}

let config = {
  devtool: (isProduction ? null : 'eval-source-map'),
  context: __dirname + '/app'
};

config.entry = {
  app: AppEntry
};

config.output = {
  filename: JSFilename,
  path: __dirname + '/dist',
  publicPath: PublicPath
};

config.module = {
  loaders: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel-loader']
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style-loader', scssLoaders.join('!'))
    }
  ]
};

config.plugins = plugins;

export default config;
