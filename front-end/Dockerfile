FROM node:18

ENV PORT=80

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
COPY . /app

CMD ["npm", "start"]
