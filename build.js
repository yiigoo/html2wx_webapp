const fs = require('fs-extra')
const rimraf = require('rimraf')

async function removeDist() {
	await rimraf('./dist', function (err) { // 删除当前目录下的 aaa
		console.log(1)
		if (err) console.log(err)
	});
}
removeDist()
console.log(2)
// 创建dist
fs.mkdirSync('dist', (error) => {
	console.log('create dist')
})
//复制文件夹
// With async/await:
fs.copySync('./src/pages', './dist/pages')

const _pagesPath = './dist/pages'
let routers = []
const build_wx_file = (pagesPath , level) =>{
	let pagesDirs = fs.readdirSync(pagesPath)
	pagesDirs.forEach(dirname=>{
		fs.readdir(pagesPath + '/' + dirname, function(err, files){
			if( files ) {
				files.forEach(file=>{
					if (/\.html/.test(file)) {
						
						let _file = file.substr(0,file.length - 5)
						console.log(pagesPath + '/' + dirname + '/' + _file)
						fs.copySync('./template/template.js', pagesPath + '/' + dirname + '/' + _file + '.js')
						fs.copySync('./template/template.json', pagesPath + '/' + dirname + '/' + _file + '.json')
						fs.copySync('./template/template.wxss', pagesPath + '/' + dirname + '/' + _file + '.wxss')
						fs.writeFile( pagesPath + '/' + dirname + '/' + _file + '.wxss', '@import "' + level + 'app.wxss";')
						// 读取文件内容
						let webappHtml = fs.readFileSync(pagesPath + '/' + dirname + '/' + file)
						webappHtml = webappHtml.toString().match(/<body>[\d\D]+<\/body>/g)[0]
						webappHtml = webappHtml.replace(/<body>/g, '<view>')
						webappHtml = webappHtml.replace(/<\/body>/g, '</view>')
						webappHtml = webappHtml.replace(/<div /g, '<view ')
						webappHtml = webappHtml.replace(/<\/div>/g, '</view>')
	
						webappHtml = webappHtml.replace(/<a href=/g, '<navigator url=')
						webappHtml = webappHtml.replace(/<\/a>/g, '</navigator>')
						fs.writeFile( pagesPath + '/' + dirname + '/' + _file +".wxml", webappHtml)
						
						rimraf(pagesPath + '/' + dirname + '/' + file, function (err) { // 删除当前目录下的 aaa
							if (err) console.log(err);
						});
					}else{
						build_wx_file( pagesPath + '/' + dirname , level + '../' )
					}
				})
			}
			
		})
	})
}
build_wx_file(_pagesPath , '../../')

console.log(routers)







