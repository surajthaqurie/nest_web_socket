# Specifu Node version and Image
FROM node:18-alpine As development

# Specify the working dir
WORKDIR /app

COPY package*.* ./
COPY tsconfig.build.json ./
COPY tsconfig.json ./

RUN npm ci

RUN npm run build

EXPOSE 3000


# Specifu Node version and Image
FROM node:18-alpine As production

# Configure NODE_ENV
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


# Specify the working dir
WORKDIR /app

# Copy all file form development
COPY --from=development /app .

EXPOSE 3000

CMD [ "node", "dist/main" ]
