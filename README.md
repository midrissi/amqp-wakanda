amqp-wakanda
============

amqp-wakanda is an AMQP client for wakanda (based on the [node-amqp module]).

Installation
============

Clone the repository to the Modules folder, and move the content of the `dependencies` folder to the `Modules` folder.

Documentation
============

Please visit the [node-amqp module] repository.

Example
============

```javascript
var amqp = require('amqp');

var connection = amqp.createConnection();

// Wait for connection to become established.
connection.on('ready', function () {
  // Use the default 'amq.topic' exchange
  connection.queue('my-queue', function(q){
      // Catch all messages
      q.bind('#');
    
      // Receive messages
      q.subscribe(function (message) {
        // Print messages to stdout
        console.log(message);
      });
  });
});

wait()
```

Remarks
============

The AMQPS is not tested!

Licence
============

Please visit the [node-amqp module] repository.

[node-amqp module]:https://github.com/postwait/node-amqp