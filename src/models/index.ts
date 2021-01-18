import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

function connect_DB () {
  function connect () {
    const replicaURI = <string>process.env.MONGO_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      dbName: process.env.DB_NAME,
    };
    function db_error (error: Error) {
      if (error) {
        console.log('몽고디비 연결 에러', error);
      } else {
        console.log('몽고디비 연결 성공');
      }
    }
    mongoose.connect(replicaURI, options, db_error);
  }
  connect();
  mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
  });

  mongoose.connection.on('disconnected', () => {
    console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
    connect();
  });
}

export default connect_DB;
