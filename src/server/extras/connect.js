import mongoose from "mongoose";
const uri =
  process.env.MONGO_URI ||
  "mongodb://localhost:27017/samnivesha?useUnifiedTopology=true&useNewUrlParser=true";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
function connectDB() {
  const db = mongoose.connection;
  db.once("open", () => {
    console.log("MongoDB database connection established successfully.");
  });
  db.on("error", console.error.bind(console, "MongoDB Connection Error"));
}
export default connectDB;
