// const path = require('path')
// // const UglifyJSPlugin = require('ugli')

// module.exports = {
//     entry: './src/index.js',    //工程资源的入口
//     output: {
//         path: path.join(__dirname,'dist'),  //绝对路径
//         filename: 'bundle.js'
//     },
//     devServer: {    //webpack-dev-server不生成文件，只在内存中
//         port: 3000,
//         publicPath: '/dist' //指定打包之后的资源路径
//     },
//     module: {   //文件加载器-loader
//         rules: [
//             {
//                 test: /\.css$/, //what kind of document is dealt by loader
//                 use: [
//                     'style-loader',     //这俩顺序是倒的    
//                     'css-loader',       //what loader
//                 ]
//             },
//         ],
//         // plugins: [
//         //     // new UglifyJSPlugin()
//         // ]
//     }

// }

const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')   //uglify针对ES5压缩特别好
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin    //压缩可视化
//HappyPack 多进程打包
const HappyPack = require('happypack')
const happyThreadPool = HappyPack.ThreadPool({size:OscillatorNode.cpus().length})   //根据cpu的数量创建线程池
//thread-loader 是另一种，它将loader放入线程池worker，同时要放在use的第一个

//tree-shaking消除无用的js代码。。。DCE
//某些被导入的模块，完全没被用到，完全可以在打包过程中去掉。

module.exports = {
    optimization: {
        minimizer: [new TerserPlugin({
            cache: true,    //加快构建速度，减少查找，加快解析
            parallel: true, //打开多线程
            terserOptions: {
                compress: { //这些都是在移除无用代码
                    unused: true,
                    drop_debugger: true,
                    drop_console: true,
                    dead_code: true
                }
            }
        })] 
    },
    resolve: {
        extensions: ['.wasm','.mjs','.js','.jsx','.json']   //默认扩展名
    },
    entry: path.resolve(__dirname,'src/index.jsx'),
	module: {
        noParese: /node_modules\/(jquery\.js)/, //解析不了就放弃，加快构建速度
		rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,    //除了这个，其他都要
                //include: 更明确
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc:false,
                        presets:[
                            [require.resolve('@babel/preset-env',{modules:false})]
                        ],
                        cacheDirectory:true
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname,'src/index.html'),
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin(),    //热更新
        new BundleAnalyzerPlugin(),
        new HappyPack({
            id: 'jsx',
            threads: happyThreadPool,
            //url-loader和file-loader不支持happypack
            loaders: ['babel-loader']
        })
    ],
    devServer: {
        hot: true
    }
}

//热更新同时需要在入口文件index.jsx添加
// if(module.hot){
//     module.hot.accept(error => {
//         if(error){
//             console.log('HMR is BUG!')
//         }
//     })
// }