const path = require('path')
// const UglifyJSPlugin = require('ugli')

module.exports = {
    entry: './src/index.js',    //工程资源的入口
    output: {
        path: path.join(__dirname,'dist'),  //绝对路径
        filename: 'bundle.js'
    },
    devServer: {    //webpack-dev-server不生成文件，只在内存中
        port: 3000,
        publicPath: '/dist' //指定打包之后的资源路径
    },
    module: {   //文件加载器-loader
        rules: [
            {
                test: /\.css$/, //what kind of document is dealt by loader
                use: [
                    'style-loader',     //这俩顺序是倒的    
                    'css-loader',       //what loader
                ]
            },
        ],
        plugins: [
            // new UglifyJSPlugin()
        ]
    }

}