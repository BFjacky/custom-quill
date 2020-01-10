<template>
  <Modal
    class="card-editor"
    :value="visible"
    title="编辑卡片"
    @on-ok="handleConfirmClick"
    @on-cancel="handleCancelClick"
    :closable="false"
  >
    <Form
      :model="formInput"
      label-position="left"
      :label-width="80"
      :rules="rules"
    >
      <FormItem label="标题:" prop="title">
        <Input v-model="formInput.title" placeholder="请输入标题"
      /></FormItem>
      <FormItem label="作者：" prop="author">
        <Input v-model="formInput.author" placeholder="请输入作者"
      /></FormItem>
      <FormItem label="内容：" prop="content">
        <Input v-model="formInput.content" placeholder="请输入内容摘要"
      /></FormItem>
      <FormItem label="图片：" prop="image">
        <div style="display:flex;">
          <Button type="default" dashed @click="uploadImage">添加图片</Button>
          <img
            v-if="formInput.image"
            :src="formInput.image"
            style="width:100px;height:100px;object-fit:cover;margin-left:20px;"
          />
        </div>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
import upload from "./upload.js";
export default {
  props: {
    cardInfo: {
      type: Object,
      default: function() {
        return {
          title: "Quill 编辑器",
          author: "jhchen",
          content:
            "Quill是一种现代的富文本编辑器，旨在实现兼容性和可扩展性。它由Jason Chen和Byron Milligan创建，并由Slab积极维护。 ",
          image:
            "http://neau-lib-static.test.upcdn.net/quill/resource/1576812308405-0.0544z7sqq9au-quill.png"
        };
      }
    },
    visible: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    visible(newval, oldval) {
      if (newval && !oldval) {
        this.formInput = { ...this.cardInfo };
      }
    }
  },
  data() {
    return {
      rules: {
        title: [{ required: true, message: "请填写标题", trigger: "change" }],
        author: [{ required: true, message: "请填写作者", trigger: "change" }],
        content: [{ required: true, message: "请填写内容", trigger: "change" }],
        image: [
          { required: true, message: "请上传一张封面图", trigger: "change" }
        ]
      },
      formInput: {}
    };
  },
  methods: {
    handleConfirmClick() {
      this.$emit("close", this.formInput);
    },
    handleCancelClick() {
      this.$emit("close", null);
    },
    async uploadImage() {
      const files = await upload.chooseFile({
        multiple: false,
        accept: "image/*"
      });
      const res = await upload.upload(files);
      this.formInput.image = res[0];
    }
  }
};
</script>
<style lang="less" scoped>
.card-editor {
  .button-container {
  }
}
</style>
