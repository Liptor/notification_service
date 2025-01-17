FROM node:18

WORKDIR /app

COPY prisma /app/prisma/
COPY package*.json ./

RUN npm install

# Copy environment variable file
COPY .env ./

COPY . .

# Generate Prisma client
RUN npx prisma generate dev

RUN npm run build

CMD ["npm", "run", "start:dev"]