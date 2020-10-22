const fs = require('fs-extra')
const rimraf = require('rimraf')
const { formatXwml } = require('./utils/utils')

// 删除
const removeDir = async() => {
	return new Promise((resolve) => {
		rimraf('./dist', (err) => {
			resolve()
		})
	})
}

// 路由
const routers = {
	"pages": []
}

// 创建编辑wxapp
const build_wx_file = (pagesPath , levelPath) =>{
	let pagesDirs = fs.readdirSync(pagesPath)
	pagesDirs.forEach(dirname=>{
		fs.readdir(pagesPath + '/' + dirname, (err, files) => {
			if( files ) {
				files.forEach(file=>{
					if (/\.html/.test(file)) {
						let filename = 'main'
						let path = `${pagesPath}/${dirname}/`

						routers.pages.push(`${path.substr(7)}${filename}`)
						// 创建路由
						fs.writeFile('./dist/routers.json', JSON.stringify(routers) ,(error) => {})
						// 生成路由 数组
						

						fs.copySync('./template/template.js', `${path}${filename}.js`)
						fs.copySync('./template/template.json', `${path}${filename}.json`)
						fs.copySync('./template/template.wxss', `${path}${filename}.wxss`)
						fs.writeFile( `${path}${filename}.wxss`, `@import "${levelPath}app.wxss";`)
						// 读取文件内容
						let webappHtml = fs.readFileSync( path + file )
						webappHtml = formatXwml(webappHtml)
						fs.writeFile( `${path}${filename}.wxml`, webappHtml)
						rimraf(`${path}${file}`,  (err) => {
							if (err) console.log(err)
						})
					}else{
						build_wx_file( pagesPath + '/' + dirname , levelPath + '../' )
					}
				})
			}
		})
	})
}


// 构建
const build = async() => {
	// 删除文件
	await removeDir()
	console.log('删除目录成功')
	// 创建目录
	fs.mkdirSync('dist')
	console.log('创建dist成功')
	// 复制文件
	fs.copySync('./src/pages', './dist/pages')
	// 复制样式
	fs.copySync('./src/app.css', './dist/app.wxss')
	// 复制图片
	fs.copySync('./src/images', './dist/images')
	// 创建wx webapp
	console.log('创建wx webapp...')
	build_wx_file('./dist/pages' , '../../')
	console.log('创建成功')
}
build()







