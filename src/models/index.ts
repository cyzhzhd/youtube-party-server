import mongoose from 'mongoose';

const MONGODB_CONNECT_OPTION = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: process.env.DB_NAME,
};

function db_error(error: Error): void {
  if (error) {
    console.log('몽고디비 연결 에러', error);
  } else {
    console.log('몽고디비 연결 성공');
  }
}

function connect_DB(): void {
  mongoose.connect(process.env.MONGODB_URI, MONGODB_CONNECT_OPTION, db_error);

  mongoose.connection.on('error', error => {
    console.error('몽고디비 연결 에러', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    mongoose.connect(process.env.MONGODB_URI, MONGODB_CONNECT_OPTION, db_error);
  });
}

export default connect_DB;
