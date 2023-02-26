
declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string;
    SALT?: string;
    JWT_SECRET?: string;
    MONGODB_URL?: string;
  }
}

