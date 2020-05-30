/*
 * @Author: flyharvest
 * @Date: 2020-05-26 14:43:52
 * @LastEditTime: 2020-05-30 18:12:04
 * @LastEditors: flyharvest
 */ 
'use strict'
const path = require('path')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  module: 'production',
  devtool: 'source-map',
  context: path.resolve(__dirname, '../'),
  entry: {
    index: './src/lib/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'vue-guide-plugin',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.js', '.vue',],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      }
    ]
  },
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    })
  ]
 
}
