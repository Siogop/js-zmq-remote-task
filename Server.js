const zmq = require('zmq');
const responder = zmq.socket('rep');
const exec = require('child_process').exec;

responder.bind('tcp://127.0.0.1:5560');
responder.on('message', function(msg) {
  console.log('received request:', msg.toString());
  exec(msg.toString(),
    (error, stdout, stderr) => {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
        const response = {
            error,
            stdout,
            stderr
        }
        responder.send(JSON.stringify(response));
    });
});