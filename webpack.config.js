const path = require('path');

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images',
					limit: 10240
				}
			}
		}, {
			test: /\.scss$/,
			// 后者根据关系整合CSS文件，前者挂载到head的style中
			//loader执行顺序：从下到上，从右到左
			use: [
				'style-loader',
				{
					loader: 'css-loader',
					options: {
						// 解决SCSS中import进来的scss文件不走下面两个loader
						importLoaders: 2,
						// 开启CSS模块化打包
						// modules: true
					}
				},
				'sass-loader',
				// 自动添加厂商前缀
				'postcss-loader'
			]
		}, {
			test: /\.(eot|ttf|svg|woff)$/,
			use: {
				loader: 'file-loader'
			}
		}],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
}