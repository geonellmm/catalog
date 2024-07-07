import * as process from 'process';

export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
});
