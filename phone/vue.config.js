const path = require('path')

module.exports = {
    publicPath: './',
    outputDir: 'phone',
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    include: [
                        path.resolve(__dirname, 'src/'),
                        path.resolve(__dirname, 'node_modules/pinyin'),
                    ]
                }
            ]
        }
    }
}