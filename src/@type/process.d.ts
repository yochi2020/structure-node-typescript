
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SALT?: string;
<<<<<<< HEAD
    JWT_SECRET?: string;
    MONGODB_URL?: string;
=======
    CLIENT_URL?: string;
    JWT_ACCESS_SECRET?: string;
    JWT_REFRESH_TOKEN_SECRET?: string;
    JWT_RESET_PASSWORD?: string;
    JWT_ACCOUNT_ACTIVATION?: string;
    EMAIL_FROM?: string;
>>>>>>> main
  }
}

