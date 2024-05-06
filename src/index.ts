import mongoose from 'mongoose';
import app from './app';
import * as fs from 'fs';
import { config } from "dotenv";
config();


const port = process.env.PORT || 5000;

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Listening: http://localhost:${port}`);
  });
});
mongoose.connection.on("error", (err) => {
  console.log(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`);
});