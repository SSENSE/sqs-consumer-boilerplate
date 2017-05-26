import Consumer from 'sqs-consumer';
import AWS from 'aws-sdk';
import { AppLogger } from '@ssense/node-logger';
import validate, { queuePayload } from './validators';
import config from './config';

const logger = new AppLogger(config.logger.level);
logger.setAppId(config.app.id);
logger.setPretty(process.env.NODE_ENV === 'development');
logger.enable(config.logger.enabled);

AWS.config.update(config.aws);

const app = Consumer.create({
    ...config.sqs,
    batchSize: 10,
    attributeNames: ['All'],
    messageAttributeNames: ['index'],
    visibilityTimeout: 30,
    waitTimeSeconds: 0,
    handleMessage: async (message, done) => {
        const startAt = Date.now();
        const metrics = [
            { metric: `${config.app.id}.count`, points: 1, type: 'count', tags: [`env:${config.environment}`] }
        ];

        // Get payload to JSON
        // TODO: To be implemented change payload flow type to your needs
        let payload: Array<any> = [];
        try {
            payload = JSON.parse(message.Body);
        } catch (err) {
            logger.error(
                `Payload error in transfer consumer: ${err.message}`,
                null,
                ['consumer', 'sqs', 'transfer'],
                err.stack
            );

            done(err);
        }

        logger.info('Payload receive in transfer consumer', null, ['consumer', 'sqs', 'transfer'], payload);

        // Validate JSON payload
        const validator = validate(payload, queuePayload);

        if (validator.error) {
            logger.error('Validation error in transfer consumer', null, ['consumer', 'sqs', 'transfer'], validator);

            return done(new Error('Validation error in transfer consumer'));
        }

        // consume job
        try {
            // Do what you need to do here...

            const duration = Date.now() - startAt;

            metrics.push({
                metric: `${config.app.id}.duration`,
                points: duration,
                type: 'histogram',
                tags: [`env:${config.environment}`]
            });

            // TODO: To be implemented send metrics to ...

            done();
        } catch (err) {
            logger.error(`Consumer Transfer Error: ${err.message}`, null, ['consumer', 'sqs', 'transfer'], err.stack);

            done(err);
        }
    },
    sqs: new AWS.SQS({ correctClockSkew: true })
});

app.on('error', (err) => {
    logger.error(`App error in transfer consumer: ${err.message}`, null, ['consumer', 'sqs', 'transfer'], err.stack);
});

export default app;
