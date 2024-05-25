FROM node:20.12.1-alpine

WORKDIR /app
COPY . .
RUN chmod +x dev-entrypoint.sh

EXPOSE 3000

ENTRYPOINT ["./dev-entrypoint.sh"]
CMD ["npm", "run", "dev"]