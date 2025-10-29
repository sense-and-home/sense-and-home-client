FROM node:25-alpine AS build
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./

RUN pnpm install
COPY . .
RUN pnpm build

FROM nginx:1.29-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]
