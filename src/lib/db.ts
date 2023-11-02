import { mongoose } from 'mongoose';

let cachedDb = null;

const pingDB = () => {

  const client = mongoose.connection.getClient();
  client.db("admin").command({ ping: 1 });
  console.info("Pinged MongoDB cluster!");
}

const dbConnection = async () => {

  const dbUser = process.env.DB_USER;
  const dbName = process.env.DB_NAME;
  const dbSecret = encodeURIComponent(process.env.DB_SECRET);

  if (cachedDb)
    return cachedDb;

  const dbUrl = `mongodb+srv://${dbUser}:${dbSecret}@cluster0.ovw7mim.mongodb.net/${dbName}?retryWrites=true&w=majority`;

  await mongoose.connect( dbUrl, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
         .then(
          () => {
            pingDB();
            cachedDb = mongoose.connection.getClient();
            return dbConnection;
          },
          err => {
            console.error(err);
            throw err;
          }
        );

}

module.exports = dbConnection;
