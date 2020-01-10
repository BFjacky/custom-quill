### 基于 Quill 定制开发富文本编辑器

#### 准备工作

- 需要准备一个 MongoDb 仓库，并让其运行在 127.0.0.1:27017
- 全局安装 nodemon `npm i nodemon -g`

#### 开发环境

web 开发 npm run dev
server 开发 npm run dev

#### 备注

server 部分的代码是部署在腾讯云函数上的，非常简陋，仅用于跑 demo，强烈建议不要看 server 部分的代码。

线上的 demo 使用了 又拍云（upyun） 作为图片存储，本地 demo 不方便泄露个人的 又拍云账号的 Token，所以在代码中有关图片上传的部分模块，我会返回一些固定的图片。

#### 部分代码结构

./web/src/views/
—————————————— index.vue 入口文件
—————————————— editor.vue 编辑器相关代码 （重点）
—————————————— customBlots.js 自定义的 Blot （重点）
—————————————— h5.vue 富文本的展示页面
—————————————— common.less 富文本编辑和展示共有的样式
