import express from "express";
const app = express();
import path from "path";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";

const __dirname = path.resolve();

// middleware to parse JSON requests
app.use(express.json());
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));

app.get("/health", (req, res) => {
  res.status(200).send("Server is healthy");
});
app.get("/book", (req, res) => {
  res.status(200).send("Server is booking");
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on  port ${ENV.PORT}`);});
  } catch (error) {
    console.error(`Failed to start server: ${error.message}`);
  }
};

startServer();