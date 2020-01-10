const env = window.location.host.includes("localhost") ? "dev" : "online";

const configDev = {
  serverHost: "http://localhost:3000"
};

const configOnline = {
  serverHost:
    "http://service-m5ka86kt-1254334094.bj.apigw.tencentcs.com/release"
};

let config;
env === "dev" ? (config = configDev) : (config = configOnline);

export default config;
