const path = require('path')

module.exports = {
    publicPath: './',
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, 'src/'),
                        path.resolve(__dirname, 'node_modules/webpack-dev-server'),
                        path.resolve(__dirname, 'node_modules/dom7/dist/dom7.modular.js'),
                        path.resolve(__dirname, 'node_modules/swiper/js/')
                    ]
                }
            ]
        }
    }
}