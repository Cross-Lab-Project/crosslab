import {utils, config as CommonConfig} from "@crosslab/service-common";
import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: parseInt(process.env.PORT ?? "3000"),
  NODE_ENV: process.env.NODE_ENV ?? "development",
  BASE_URL: process.env.BASE_URL ?? "http://localhost:3000",
  JWT_SECRET: process.env["JWT_SECRET"] ?? utils.die("JWT_SECRET is not set"),
  orm: {
    ...CommonConfig.readOrmConfig(),
  },
};
