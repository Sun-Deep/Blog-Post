const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 4000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://<username>:<password>@cluster0.d7zm9.mongodb.net/blogPost?retryWrites=true&w=majority" ||
    "mongodb://localhost:27017/blogPost",
};
export default config;
