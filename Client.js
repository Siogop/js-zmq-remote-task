const zmq = require('zmq');
const requester = zmq.socket('req');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })


requester.connect('tcp://localhost:5560');
requester.on('message', function(msg) {
    const response = JSON.parse(msg.toString());
    console.log('stdout: ', response.stdout);
    console.log('stderr: ', response.stderr);
    console.log('error: ', response.error);
    recReadline();
});

let recReadline = () => {
        readline.question(`Enter command: `, (cmd) => {        
        if (cmd === 'exit') {
            return readline.close();
        }
        requester.send(cmd);
    }
)}
recReadline();