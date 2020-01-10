<template>
  <div class="page">
    <img
      class="title"
      src="http://neau-lib-static.test.upcdn.net/quill/resource/1576815743018-0.cup6j1ilh5p-title.png"
    />
    <editor class="editor" @editorChange="handleEditorChange"></editor>
    <div class="action">
      <div class="spin" v-show="publishLoading">
        <Spin></Spin>
        <span>自动保存中...</span>
      </div>
      <Button type="primary" @click="preview" :disabled="!diaryId"
        >查看效果</Button
      >
    </div>
  </div>
</template>
<script>
import editor from "./editor.vue";
import _ from "lodash";
export default {
  components: {
    editor
  },
  data() {
    return {
      diary: {},
      diaryId: "",
      publishLoading: false,
      debouncedPublishFn: null,
      alreayProducePreviewQrcode: false
    };
  },
  methods: {
    handleEditorChange(diary) {
      if (!this.debouncedPublishFn) {
        this.debouncedPublishFn = _.debounce(this.publish, 300);
      }
      this.diary = diary;
      this.debouncedPublishFn();
    },
    async publish() {
      this.publishLoading = true;
      const res = await this.$axios.post(`${this.$config.serverHost}/diary`, {
        content: this.diary.content,
        title: this.diary.title,
        id: this.diaryId
      });
      if (res.data && res.data._id) {
        this.diaryId = res.data._id;
      }
      this.publishLoading = false;
    },
    preview() {
      const previewUrl = `${window.location.href}diary/${this.diaryId}`;
      window.open(previewUrl);
    }
  }
};
</script>
<style lang="less" scoped>
.page {
  padding-top: 40px;
  .title {
    display: block;
    margin: 0 auto;
    width: 350px;
  }
  .editor {
    width: 600px;
  }
  .action {
    position: fixed;
    top: 0px;
    height: 40px;
    background-color: #f8f8f9;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .spin {
      margin: auto 0;
      display: flex;
    }
    /deep/.ivu-btn {
      height: 40px;
      border-radius: 0px;
      width: 110px;
    }
  }
  .preview {
    position: fixed;
    right: 50px;
    top: 150px;
  }
}
</style>
