// dotenv
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

class MongoDb {
    async connect() {
        if(!process.env.MONGO_URL) {
            throw new Error("MongoDB URL is not defined");
        }
        await mongoose.connect(process.env.MONGO_URL);
    }
}

export default new MongoDb();