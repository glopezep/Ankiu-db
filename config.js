export default {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'glopezep',
    password: process.env.DB_PASSWORD || 'Guillermo@0525',
    database: process.env.DB_NAME || 'ankiu',
    charset: 'utf8',
  },
};
