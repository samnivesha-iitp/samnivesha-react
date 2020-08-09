import mongoose from "mongoose";
const uri =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/samnivesha?useUnifiedTopology=true&useNewUrlParser=true";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});
db.on("error", (err) => {
  console.error(
    "[MONGODB]: It looks like you don't have mongodb server running. Please start the server if installed otherwise install it before proceeding further."
  );
  console.error(err);
});
export default db;
