import upyun from "upyun";
import axios from "axios";
import config from "../config/index.js";
export default {
  produceClient() {
    const bucket = new upyun.Bucket(`neau-lib-static`);
    function getHeaderSign(bucket, method, path) {
      const params =
        "bucket=" + bucket.bucketName + "&method=" + method + "&path=" + path;
      return axios
        .get(`${config.serverHost}/diary/upyun/bucket?${params}`)
        .then(function(response) {
          return response.data;
        });
    }
    const client = new upyun.Client(bucket, getHeaderSign);
    return client;
  }
};
