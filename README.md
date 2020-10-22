# html2wx_webapp
html 转换为 微信小程序  

# dist 文件夹目录  
dist 文件夹目录  
├── dist  
  ├── pages     微信小程序 pages  
  ├── images    图片资源  
  ├── routers   生成的路由，手动复制到小程序的app.json中  
  └── app.wxss  小程序样式，暂时全局样式  

# 文件标签替换
div => view  
img => image  
a => navigator  
href => url  

# src 文件介绍
开发html时，最好开一个http-server , 路径与小程序一致  
├── pages     html 网页  
├── images    图片资源  
└── app.css   样式，暂时全局样式  

