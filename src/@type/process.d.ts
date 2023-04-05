
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?:string;
    PORT?: string;
    SALT?: string;
    CLIENT_URL?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_REFRESH_TOKEN_SECRET?: string;
    JWT_RESET_PASSWORD?: string;
    JWT_ACCOUNT_ACTIVATION?: string;
    EMAIL_FROM?: string;
    MONGODB_URL?: string;
  }
}

