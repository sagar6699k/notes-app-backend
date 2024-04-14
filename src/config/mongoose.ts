import { connect, set } from "mongoose";
import { config } from "dotenv";
config();

const MONGO_DB_URI = process.env.MONGO_DB_URI;
// connection to db
(async () => {
  try {
    set("strictQuery", false);
    const db = await connect(MONGO_DB_URI);
    console.log("MongoDB connected to", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();