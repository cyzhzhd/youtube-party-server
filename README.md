## start server
```
npm install
npm start
```

## server architecture
Route53 --> ALB --> EC2(Express, Socket) --> DocumentDB  
................................ | --> EC2(Express, Socket) --> DocumentDB  

## frame works  
[Express](https://github.com/expressjs/express)  
[Socket.io](https://github.com/socketio/socket.io)  
[Mongoose](https://github.com/Automattic/mongoose)  

## API
[Swagger hub](https://app.swaggerhub.com/apis/cyzhzhd/utubeparty/1.0.0)

## env
```
PORT=
MONGODB_URI=
DB_NAME=
APOLLO_KEY=
APOLLO_GRAPH_VARIANT=
APOLLO_SCHEMA_REPORTING=
```