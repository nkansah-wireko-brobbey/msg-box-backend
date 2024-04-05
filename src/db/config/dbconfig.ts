import mongoose from "mongoose";
import { colors } from "../../utils/constants/colors";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

export const connectToMongoDB = async () => {

await mongoose.connect(mongoUrl, {
    dbName: "msg-app",
    })
    .then(() => {
    console.log( colors.magenta,"Connected to MongoDB");
    }).catch((error) => {
    console.error(colors.red,"Error connecting to MongoDB:", error.message);
    }
    ).finally(() => {
    console.log(colors.reset);
    });

}


