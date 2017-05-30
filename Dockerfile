FROM mhart/alpine-node:7.8

RUN mkdir /code

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ENV NPM_CONFIG_LOGLEVEL=warn

# default to port 80 for node, and 5858 or 9229 for debug
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT 5858 9229

# install dependencies first, in a different location for easier app bind mounting for local development
COPY package.json /code/

WORKDIR /code

RUN npm install --depth=0 && npm cache clean

# copy in our source code last, as it changes the most
COPY . /code

CMD ["npm", "start"]
