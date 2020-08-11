/*

Create and optimize a node.js server that is able to handle
600 requests per second and resolve each request in 2 seconds.

What is something about this feature you can demo?
- a test driver set up to send
600 requests per second -> how to track that the requests are sent in 1 second?
for 5 minute -> so 5*60*600 requests?
and record the number of request timeouts in a graph.

What is something about this feature you can talk about?
- We will present what latency is.
- We will also present some of the techniques commonly used to reduce latency
for different types of API and the respective trade-offs/challenges.

What are the things you need to do to make this feature work?
How much time will you need for each task?
Set up test driver to
Send n requests in t minutes (>2h)
Generate random API request (>2h)
Mock 3rd party dependencies that may have rate issues (>1h)


Load testing and mock testing

*/

/*

make an array of available/unavailable endpoints

for every second in 5 mins:
  send 600 random api requests asynchronously
  if response:
    print success, url, resolve time in a csv file
    record success, url, resolve time in a csv file
  else if error:
    print success, url, resolve time in a csv file
    record success, url, resolve time in a csv file
  else if timeout:
    print fail, url, resolve time in a csv file
    record fail, url, resolve time in a csv file


optional:
generate html with graph from csv file

minimum requirement:
server doesn't reject requests

to do:
✔ configure pool size
▪ check code for async
▪ setup load testing
▪ mock testing

restrictions:
elephantsql free tier only allow 5 concurrent connections (might interfere)

*/

/* for (let i = 0; i < 600; i++) {
  console.log(i);
}; */
