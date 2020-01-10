module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "http://neau-lib-static.test.upcdn.net/quill/dist"
      : "/",
  outputDir: "../server/dist"
};
