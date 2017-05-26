const { version } = require('../package.json');

const environment = {
    development: {
        isProduction: false
    },
    production: {
        isProduction: true,
        logger: {
            enabled: true,
            level: process.env.LOG_LEVEL || 4
        }
    },
    test: {
        isProduction: true,
        logger: {
            enabled: true,
            level: 0
        }
    }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
    {
        environment: process.env.NODE_ENV || 'development',
        app: {
            name: process.env.APP_NAME || 'MS Transfer',
            id: process.env.APP_ID || 'ms-transfer',
            version
        },
        logger: {
            enabled: true,
            level: process.env.LOG_LEVEL || 0
        },
        aws: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        },
        sqs: {
            queueUrl: process.env.SQS_QUEUE_URL
        }
    },
    environment
);
