<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <div v-html="content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: "",
      title: ""
    };
  },
  async created() {
    const id = this.$route.params.id;
    const res = await this.$axios.get(`${this.$config.serverHost}/diary/${id}`);
    this.content = res.data.content;
    document.title = res.data.title;
    this.title = res.data.title;
  }
};
</script>
<style lang="less" scoped>
@import "common.less";
.container {
  padding: 10px;
  max-width: 500px;
  margin: 0 auto;
}
</style>
