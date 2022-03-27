const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
	entry:{
		index:'./src/index.js'
	},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name]-[chunkhash].bundle.js',
		publicPath:''
	},
	module:{
		rules:[
			{
				test:/\.js$/,
				use:{loader:'babel-loader'}
			},
			{
				test:/\.(png|jpg|jpeg|gif)$/,
				use:[
					// {loader:'url-loader'},
					{loader:'file-loader'}
				]
			}
		]
	},
	resolve:{
		//配置免后缀的文件类型
		extensions:['.js','.jsx','.vue','.css','.less','.scss'],
		//为全路径配置缩写@
		alias:{
			'@':path.resolve(__dirname,'src')
		}
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./public/index.html',
			filename:'index.html',
			// chunks:['index']
		})
	]
}