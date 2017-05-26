#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
const pkg = require('../package.json');
const config = require('../src/config');
const app  = require('../src/consumer');

/**
 * Start
 */
app.start();

console.info(
    '==> 🚀  Start consuming %s at version %s, environment %s, queue %s',
    config.app.name,
    pkg.version,
    config.environment,
    config.sqs.queueUrl
);

// quit on ctrl-c when running docker in terminal
process.on('SIGINT', () => {
    console.info(
        'Got SIGINT (aka ctrl-c). Graceful shutdown ',
        new Date().toISOString()
    );
    shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', () => {
    console.info(
        'Got SIGTERM (docker container stop). Graceful shutdown ',
        new Date().toISOString()
    );
    shutdown();
});

// shut down consumer
function shutdown() {
    app.stop();
}

//
// need above in docker container to properly exit
//

