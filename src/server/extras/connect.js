const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
function connect(db) {
  const url = "mongodb://localhost:27017/samnivesha?useUnifiedTopology=true";
  MongoClient.connect(url, (err, client) => {
    if (err) throw err;
    client.db(db);
  });
}
export default connect;
