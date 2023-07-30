FROM node:18-slim as builder

ENV YARN_CACHE_FOLDER=/root/.yarn
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN YARN_CACHE_FOLDER=/root/.yarn yarn install --silent

COPY src ./src
COPY config ./config
COPY tsconfig.json ./
COPY tsconfig.build.json ./

RUN yarn build

FROM node:18-slim as runner

ENV YARN_CACHE_FOLDER=/root/.yarn
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor -o /usr/share/keyrings/googlechrome-linux-keyring.gpg \
    && sh -c 'echo "deb [arch=amd64 signed-by=/usr/share/keyrings/googlechrome-linux-keyring.gpg] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && groupadd -r pptruser && useradd -rm -g pptruser -G audio,video pptruser

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN YARN_CACHE_FOLDER=/root/.yarn yarn install --production=true

COPY --from=builder /usr/src/app/dist/ ./dist
COPY --from=builder /usr/src/app/config/ ./config
COPY nest-cli.json ./

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
