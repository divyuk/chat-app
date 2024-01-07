import { EnvConfig } from "./types";

export const config: EnvConfig = {
  SERVER_PORT: parseInt(process.env.SERVER_PORT || "3000", 10),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};
