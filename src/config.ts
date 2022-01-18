import dotenv from "dotenv"
dotenv.config()
const {
  HOSTING,
  PORT,
  DATABASE_PORT,
  DATABASE_TEST,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  ENV,
  JWT_SECRET_KEY,
  SALT_ROUNDS_COUNT,
  PEPPER_KEY
} = process.env

export default {
  port: PORT,
  host: HOSTING,
  dbPort: DATABASE_PORT,
  database: ENV === "dev" ? DATABASE_NAME : DATABASE_TEST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  pepper: PEPPER_KEY,
  salt: SALT_ROUNDS_COUNT,
  tokenSecret: JWT_SECRET_KEY,
  role: 0,
  user_id: 0
}
