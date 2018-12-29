var fs = require('fs');
var path = require('path');
var webpack = require('webpack');


var nodeModules = {};
fs.readdirSync('node_modules')
  .forEach(function(mod) {
    if (mod !== '.bin') {
      nodeModules[mod] = 'commonjs ' + mod;
    }
  });

const appPath = path.join(__dirname, './src');
const scriptsPath = path.join(__dirname, './scripts');
const exportsPath = path.join(__dirname, './exports');

const ignoredPaths = [
  ".git",
  "test",
  "ops",
  "public",
  "templates",
  "scripts",
  "exports",
  "build",
  "*.md",
  "gulpfile.js"
];


module.exports = {
  // export and entrypoint file options
  devtool: "#inline-source-map",
  target: 'node',
  entry: {
    app: [
      'babel-polyfill',
      './src/app'
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'app.js',
    publicPath: '/build/'
  },

  // nodejs options
  node: {
    __dirname: true,
    __filename: true,
    fs: 'empty'
  },
  externals: nodeModules,


  // basic webpack options
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      src: appPath,
      scripts: scriptsPath,
      exports: exportsPath,
      config: path.resolve(appPath, 'config'),
      constants: path.resolve(appPath, 'constants'),
      core: path.resolve(appPath, 'core'),
      libs: path.resolve(appPath, 'libs'),
      middlewares: path.resolve(appPath, 'middlewares'),
      models: path.resolve(appPath, 'models'),
      services: path.resolve(appPath, 'services'),
      utils: path.resolve(appPath, 'utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: 'eslint-loader',
        enforce: "pre",
        exclude: /(node_modules)/
      },
      {
        test: /\.js?/,
        use: 'babel-loader?cacheDirectory=true',
        include: path.join(__dirname, 'src'),
        exclude: /(node_modules)/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: process.env.NODE_ENV === 'production' ? false : true
    }),
    new webpack.WatchIgnorePlugin(
      ignoredPaths.map(function(filePath) {
        return path.resolve(__dirname, './' + filePath)
      })
    )
  ]
};