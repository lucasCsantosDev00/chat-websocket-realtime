class Database {
  static async connect(mongoose) {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/chatdb",
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          console.log("Error connecting to MongoDB:", err);
        } else {
          console.log("Successfully connected to MongoDB");
        }
      }
    );
  }
}

export { Database };
