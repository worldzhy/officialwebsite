# 使用PM2来部署项目

$ npm install -g pm2 | yarn global add pm2 命令行全局安装 pm2。
$ npm run build | yarn build 构建 build 包。
$ pm2 start app.js 启动 app 项目，监听端口 3580。

$ pm2 list 列出由 pm2 管理的所有进程信息，还会显示一个进程会被启动多少次，因为没处理的异常。
$ pm2 monit 监视每个node进程的CPU和内存的使用情况。
$ pm2 logs 显示所有进程日志
$ pm2 stop all 停止所有进程
$ pm2 restart all 重启所有进程
$ pm2 reload all 0 秒停机重载进程 (用于 NETWORKED 进程)
$ pm2 stop 0 停止指定的进程
$ pm2 restart 0 重启指定的进程
$ pm2 startup 产生 init 脚本 保持进程活着
$ pm2 web 运行健壮的 computer API endpoint
$ pm2 delete 0 杀死指定的进程
$ pm2 delete all 杀死全部进程

运行进程的不同方式：
$ pm2 start app.js -i max 根据有效CPU数目启动最大进程数目
$ pm2 start app.js -i 3 启动 3 个进程
$ pm2 start app.js -x 用fork模式启动 app.js 而不是使用 cluster
$ pm2 start app.js -x -- -a 23 用 fork 模式启动 app.js 并且传递参数 (-a 23)
$ pm2 start app.js --name serverone 启动一个进程并把它命名为 serverone
$ pm2 stop serverone 停止 serverone 进程
$ pm2 start app.json 启动进程, 在 app.json里设置选项
$ pm2 start app.js -i max -- -a 23 在--之后给 app.js 传递参数
$ pm2 start app.js -i max -e err.log -o out.log 启动 并 生成一个配置文件