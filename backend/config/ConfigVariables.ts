import dotenv from "dotenv";

dotenv.config();

const ConfigVariables = {
    connectionString: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET_KEY,
    jwtExpiration: process.env.JWT_TOKEN_EXPIRES || "1h",
    clientURL: process.env.CLIENT_URL || "http://localhost:5173",
    portNumber: process.env.BACKEND_PORT || 5001,
    AUTH_TOKEN: "token",
    BUFFER_FORMAT: "base64",
    BCRYPT_SALT_ROUNDS: 10,
};

export default ConfigVariables;
