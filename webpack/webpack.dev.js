const webpack = require('webpack')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        hot: true,
        open: true,
        port: 6010,
        historyApiFallback: true,
    },
    devtool: 'cheap-module-source-map',
    plugins: [
        new ReactRefreshWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env.name': JSON.stringify('RedMart Dev'),
        }),
    ],
}