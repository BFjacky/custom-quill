### 基于 Quill 定制开发富文本编辑器

#### 安装依赖

npm install

#### 开发环境

npm run dev

接口直接访问我部署在腾讯云函数上的服务，因为 server 部分涉及一些重要的 token 就不露出来了

#### 部分代码结构

./web/src/views/index.vue 入口文件

./web/src/views/editor.vue 编辑器相关代码 **（重点）**

./web/src/views/customBlots.js 自定义的 Blot **（重点）**

./web/src/views/h5.vue 富文本的展示页面

./web/src/views/common.less 富文本编辑和展示共有的样式 **（重点）**

./web/src/views/components/cardEditor.vue 新建卡片时的表单弹窗

./web/src/views/components/upload.js 上传方法

其他的文件仅仅是为了 demo 能够跑起来而添加的，仅有上面的提到的 **（重点）** 文件是和 quill 开发相关的部分，其他的代码无关紧要，请不要阅读来浪费你宝贵的时间。

点击编辑页面的 **查看效果** 后，建议调成手机页面进行查看。