import { connect, set } from "mongoose";
import { config } from "dotenv";
config();


// Assuming MONGO_DB_URI is being imported or defined somewhere
const MONGO_DB_URI: string | undefined = process.env.MONGO_DB_URI;

async function connectToDatabase() {
  // Provide a default value or handle the case when MONGO_DB_URI is undefined
  if (!MONGO_DB_URI) {
    throw new Error('MONGO_DB_URI is not defined');
  }

  const db = await connect(MONGO_DB_URI);
  console.log('Database connected:',db.connection.name );
}

connectToDatabase().catch(error => {
  console.error('Database connection error:', error);
});
