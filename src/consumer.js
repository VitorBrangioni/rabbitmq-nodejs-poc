var amqp = require('amqplib/callback_api');

amqp.connect('amqp://rabbitmq:rabbitmq@localhost:5672', function (err, conn) {
    conn.createChannel(function (err, ch) {
        var q = 'hello';

        ch.assertQueue(q, { durable: false });
        ch.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
        ch.consume(q, function (msg) {
            const obj = msg.content.toString();
            const content = JSON.parse(msg.content);
            console.log(" [x] Received %s", content);
        }, { noAck: true });
    });
});