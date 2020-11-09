const childProc = require("child_process");

const CHILD_PROCESSES = 600;
const URL = "http://localhost:3000/advance/result?semesterId=1110000000&facultyId=1100000000&dayOfWeek=4";
// const URL = "http://localhost:3000/";
// const currentIter = 0;
const iterations = 10;
const intervalms = 1000;
const timeoutms = 2000;

console.log(`
Request Timeout, Requests per Seconds, Number of Seconds
${timeoutms}, ${CHILD_PROCESSES}, ${iterations}`);
console.log(`
Success |  Timeout | Error | Avg resp
   #    |     #    |   #   | time (RTT)   
---------------------------------------`);

function sendRequest(x) {
  return (async () => {
    const duration = [];
    const children = [];
    let timeoutCount = 0;
    let errorCount = 0;
    let successCount = 0;
    let avg = 0;
    const errList = [];

    for (let i = 0; i < CHILD_PROCESSES; i++) {
      const childProcess = childProc.spawn("node", ["child.js", `--url=${URL}`]);
      children.push(childProcess);
    }

    let responses = children.map((child) => new Promise(((res) => {
      child.stdout.on("data", (data) => {
        // console.log(`response duration: ${data} ms | iter: ${x}`);
        // console.log(`${data} | iter: ${x}`);
        // console.log(data.toString());
        // console.log(!isNaN(parseInt(data, 10)));
        if (!isNaN(parseInt(data, 10))) {
          // console.log(duration);
          duration.push(parseInt(data, 10));
        } else {
          errList.push(data.toString());
          // console.log(data);
        }
      });
      child.on("exit", (code) => {
        // console.log(code);
        res(code);
      });
    })));

    responses = await Promise.all(responses);
    // console.log(responses);
    // console.log(responses.filter(code => code === 0).length);
    // console.log(responses.filter(code => code === 1).length);
    // console.log(responses.filter(code => code !== 0 && code !== 1).length);
    // console.log(responses.length);

    if (responses.filter(code => code === 0)) {
      const sum = duration.reduce((a, b) => a + b, 0);
      avg = (sum / duration.length) || 0;
      // console.log(`average response duration: ${avg}`);
      successCount = responses.filter(code => code === 0).length;
    }

    if (responses.filter(code => code === 1)) {
      errorCount = responses.filter(code => code === 1).length;
    }

    if (responses.filter(code => code !== 0 && code !== 1)) {
      timeoutCount = responses.filter(code => code !== 0 && code !== 1).length;
    }
    console.log(`${successCount}\t|    ${timeoutCount}    |   ${errorCount}   | ${avg} ms`);
    // console.log(errList);
    // console.log(errList.length);
  })();
}

const interval = setInterval(() => {
  for (let i = 0; i < iterations; i++) {
    sendRequest(i);
    if (i === iterations - 1) {
      clearInterval(interval);
    }
  }
}, intervalms);
