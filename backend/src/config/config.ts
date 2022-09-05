import dotenv from 'dotenv';

dotenv.config();

const SERVER_TOKEN_ISSUER = process.env.SERVER_TOKEN_ISSUER || 'coolIssuer';
const SERVER_TOKEN_EXPIRETIME = process.env.SERVER_TOKEN_EXPIRETIME || 3600;
const SERVER_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || 's3cr3t';

const MONGO_USERNAME = process.env.MONGO_USERNAME || '';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || '';
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@leitores.2g1jwg5.mongodb.net`;
const PORT = process.env.PORT || '5000';

export const config = {
  mongo: {
    url: MONGO_URL
  },
  server: {
    PORT: PORT,
    token: {
      expireTime: SERVER_TOKEN_EXPIRETIME,
      issuer: SERVER_TOKEN_ISSUER,
      secret: SERVER_TOKEN_SECRET
    }
  }
};
