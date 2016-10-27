/**
 * Http server for serving the frontend files
 */

const express = require('express');
const webpack = require('webpack');
const path = require('path');
const config = require('config');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig = require('./webpack.config');

const app = express();

app.use('/api', proxyMiddleware({ target: config.API_URL, changeOrigin: true, secure: false }));
app.use('/socket.io', proxyMiddleware({ target: config.API_URL, changeOrigin: true, secure: false, ws: true }));
app.use(require('connect-history-api-fallback')());

const compiler = webpack(webpackConfig);

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    quiet: false,
    noInfo: false,
    lazy: false,
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true,
    },
  }));

  app.use(require('webpack-hot-middleware')(compiler));

  app.use(express.static(path.join(__dirname, 'src/static')));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}

app.listen(config.PORT);
console.log(`Server is now running at http://localhost:${config.PORT}.`); // eslint-disable-line no-console
