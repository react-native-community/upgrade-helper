FROM buildkite/puppeteer:latest

# Fix emojis not loading
RUN apt-get update -y
RUN apt-get install -y fonts-noto-color-emoji

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn && yarn cache clean

COPY . .