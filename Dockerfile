# stage 1
FROM node:16.13.0 as node
ENV NODE_OPTIONS=--max-old-space-size=8192
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --configuration production

# stage 2
FROM nginx:alpine
ENV TZ="Asia/Ho_Chi_Minh"
COPY --from=node /app/dist/ucart /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
