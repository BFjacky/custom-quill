<template>
  <div class="container">
    <div class="title">
      <input
        class="input"
        v-model="title"
        placeholder="请输入标题..."
        @on-change="handleTitleChange"
      />
    </div>
    <div id="toolbar">
      <Tooltip content="加粗" placement="bottom">
        <button class="ql-bold"></button>
      </Tooltip>
      <Tooltip content="倾斜" placement="bottom">
        <button class="ql-italic"></button>
      </Tooltip>
      <Tooltip content="下划线" placement="bottom">
        <button class="ql-underline"></button>
      </Tooltip>
      <Tooltip content="删除线" placement="bottom">
        <button class="ql-strike"></button>
      </Tooltip>
      <Tooltip content="一级标题" placement="bottom">
        <button class="ql-header1">H1</button>
      </Tooltip>
      <Tooltip content="二级标题" placement="bottom">
        <button class="ql-header2">H2</button>
      </Tooltip>
      <Tooltip content="添加卡片" placement="bottom">
        <button class="ql-card">
          <Icon type="md-card" />
        </button>
      </Tooltip>
      <Tooltip content="添加图片墙" placement="bottom">
        <button class="ql-myImage">
          <Icon type="md-image" />
        </button>
      </Tooltip>
    </div>
    <div id="editor"></div>
    <card-editor
      :visible="cardEditorVisible"
      @close="handleCardClose"
    ></card-editor>
  </div>
</template>

<script>
import Quill from "quill";
import upload from "./components/upload.js";
import customBlots from "./customBlots.js";
import cardEditor from "./components/cardEditor.vue";
customBlots.registerCustomBlots(Quill);

export default {
  name: "home",
  components: {
    cardEditor
  },
  data() {
    return {
      quill: null,
      cardEditorVisible: false,
      quillSelection: null,
      title: ""
    };
  },
  async created() {},
  mounted() {
    this.quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: {
          container: "#toolbar",
          handlers: {
            card: () => {
              this.quillSelection = this.quill.getSelection();
              this.cardEditorVisible = true;
            },
            myImage: async () => {
              const files = await upload.chooseFile({
                multiple: true,
                accept: "image/*"
              });
              if (!files || !files.length) return;
              this.$Spin.show();
              const res = await upload.upload(files);
              this.$Spin.hide();
              const addRange = this.quill.getSelection().index || 0;
              this.quill.insertEmbed(
                addRange,
                "imageWall",
                {
                  imageUrls: JSON.stringify(res),
                  desc: "test"
                },
                Quill.sources.USER
              );
              this.$nextTick(() => {
                this.quill.setSelection(addRange + 1, Quill.sources.SILENT);
              });
            }
          }
        }
      },
      placeholder: "请在此开始编辑..."
    });

    this.quill.on("editor-change", () => {
      this.$emit("editorChange", {
        content: this.quill.container.firstChild.innerHTML,
        title: this.title
      });
    });
  },
  methods: {
    handleCardClose(cardInfo) {
      this.cardEditorVisible = false;
      if (cardInfo) {
        const addRange = this.quillSelection.index || 0;
        this.quill.insertEmbed(addRange, "card", cardInfo, Quill.sources.USER);
        this.$nextTick(() => {
          this.quill.setSelection(addRange + 1, Quill.sources.SILENT);
        });
      }
    },
    handleTitleChange() {
      this.$emit("editorChange", {
        content: this.quill.container.firstChild.innerHTML,
        title: this.title
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../node_modules/quill/dist/quill.core.css";
@import "../../node_modules/quill/dist/quill.snow.css";
@import "./common.less";
.container {
  margin: 0 auto;
  width: 100%;
  min-height: 500px;
  .title {
    padding: 0 20px;
    .input {
      background: rgba(0, 0, 0, 0);
      border-width: 0px;
      border-bottom: 1px solid #333333;
      border-radius: 0px;
      font-size: 22px;
      color: #17233d;
      font-weight: bold;
      outline: none;
      width: 100%;
    }
  }
  #toolbar {
    display: flex;
    justify-content: space-between;
    border-width: 0px;
    position: -webkit-sticky;
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 40px;
    /deep/ .ivu-icon {
      vertical-align: 0;
    }
    /deep/ button {
      line-height: 0px;
      height: 40px;
      width: 48px;
      font-size: 28px;
    }
  }
  #editor {
    width: 100%;
    border-width: 0px;
    font-size: 16px;
  }
}
</style>
