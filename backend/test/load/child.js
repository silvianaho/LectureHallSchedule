const axios = require("axios");
const argv = require("minimist")(process.argv.slice(2));

(async () => {
  // process.argv = command line arguments passed when the Node.js process was launched
  // cmd: node child --url="https://fsp-xjibaboom-2a14-teamsos.herokuapp.com/"
  // console.log(process.argv);


  axios.interceptors.request.use((config) => {
    config.metadata = { startTime: new Date() };
    return config;
  }, (error) => Promise.reject(error));

  axios.interceptors.response.use((response) => {
    response.config.metadata.endTime = new Date();
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
  }, (error) => Promise.reject(error));

  axios.get(argv.url, { timeout: 2000 })
    .then((response) => {
      // console.log("success");
      process.stdout.write(response.duration.toString());
      process.exitCode = 0;
    })
    .catch((error) => {
      // console.log(error.code);
      // console.log("fail");
      // process.stdout.write(`err ${error.response.data.error}`);
      process.exitCode = !error.code ? 1 : -1;
      process.stdout.write(error.response.data.error);
      // process.exitCode = 1;
      // console.log(process.exitCode);
    });
})();
