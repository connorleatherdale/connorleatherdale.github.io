// simple worker function, allows me to process things without the browser/site freeze
// essentially, starts, does i++, then wait a certain amount of time, and start over.

let i = 0;

function timedCount() {
  i ++;
  postMessage(i);
  setTimeout("timedCount()",500);
}

timedCount();