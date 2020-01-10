import upyun from "../../lib/upyun.js";

export default {
  chooseFile: function(params) {
    return new Promise(resolve => {
      const inputEle = document.createElement("input");
      inputEle.style.display = "none";
      inputEle.setAttribute("multiple", params.multiple || false);
      inputEle.setAttribute("accept", params.accept || "");
      inputEle.setAttribute("type", "file");
      inputEle.click();
      const handleFileChange = () => {
        resolve(inputEle.files);
        inputEle.removeEventListener("change", handleFileChange);
      };
      inputEle.addEventListener("change", handleFileChange);
    });
  },
  upload(files) {
    console.log(files);
    return new Promise(resolve => {
      const uploadingList = [];
      Array.prototype.forEach.call(files, async (file, index) => {
        uploadingList[index] = "UPLOADING";
        const upyunClient = upyun.produceClient();
        const path = `/quill/resource/${new Date().getTime()}-${Math.random().toString(
          36
        )}-${file.name}`;
        const res = await upyunClient.putFile(path, file);
        if (!res) {
          uploadingList[index] = "FAILED";
          this.$Message.error(`上传失败`);
        }
        const fileUrl = "http://neau-lib-static.test.upcdn.net" + path;
        uploadingList[index] = fileUrl;
        if (!uploadingList.find(item => item === "UPLOADING")) {
          resolve(uploadingList);
        }
      });
    });
  }
};
