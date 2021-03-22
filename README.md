Microservice with NestJS + MongoDB backend and React frontend.


## Usage

Then, client app can use at port: 3000

## How to run in development

Please follow these steps

```bash
git clone https://github.com/thanhndbkhn/order-website.git

cd order-website && docker-compose up -d

access: http://localhost:3000
```
## order-service API document (Swagger)
```bash
access: http://localhost:4000/api
```
## Note
```bash
  after 30s : update stautus Confirmed => Dilevered (use Cron)
  after 30s : fecth data OrderList in screen OrderList
```

## Testing

This application also tested, you can run the test to see the result.

## Test for Order service

```bash
cd ../payment-service
npm run start

cd ../order-service
npm run test
```

## Test Front-end

```bash
cd ../order-front-end
npm test

## Technology

Here is all the tech I have use in this project:

- Frontend: [React](https://reactjs.org/) + [Redux-Thunk](https://redux.js.org/)
- Backend: [NestJS](https://nestjs.com/) + Database [Mongodb](https://www.mongodb.com/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
