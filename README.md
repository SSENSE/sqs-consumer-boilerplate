# SQS Consumer Boilerplate

## Quick start


#### 1. Get the latest version

Start by cloning the latest version of SQS Consumer Boilerplate on your local machine by running:
```shell
$ git clone -o sqs-consumer-boilerplate -b master --single-branch \
      https://github.com/SSENSE/sqs-consumer-boilerplate.git MyConsumer
$ cd MyConsumer
```

#### 2. Run `yarn install` or `npm install`


### Run consumer

```shell
# Export environment variables to your terminal
$ export $(cat ./.env | xargs)

# Run consumer as dev
$ yarn run dev
# npm run dev

# Or run as production
$ yarn start
# npm start
```

### How to Build, Test, Deploy

If you need to run the app in production without docker, simply run:

```shell
$ yarn start
# or
$ npm start
```

#### Test

```shell
$ yarn test

# Get test coverage
$ yarn run coverage
```

#### Running with docker-compose

```shell
$ docker-compose up
```

#### Build Docker image

```shell
# Production dependencies only
$ docker build -t docker-user/my-consumer .

# With devDependencies
docker build -t docker-user/my-consumer --build-arg NODE_ENV=development .
```

#### Add your remote git repository

```shell
git remote add origin git@github.com:organization/my-repository.git
```


## Libraries
[aws-sdk](https://www.npmjs.com/package/aws-sdk)

[joi](https://www.npmjs.com/package/joi)

[sqs-consumer](https://www.npmjs.com/package/sqs-consumer)

## Tools
[Babel](https://babeljs.io/)

[Flow](https://flow.org/)

## TODO
- [ ] Add tests

## License

This project is licensed under the MIT license, Copyright (c) 2017 SSENSE.
For more information see [LICENSE.md](./LICENSE.md).
