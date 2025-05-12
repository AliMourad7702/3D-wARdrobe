const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const dotenv = require("dotenv");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const clothingRoutes = require("./routes/clothingRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const mannequinRoutes = require("./routes/mannequinRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


const PORT = process.env.PORT;
const dbUser = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASS;
const dbName = process.env.DB_NAME;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.nanh9uy.mongodb.net/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error: ', error);
});

db.once('open', () => {
    console.log("Connected to MongoDB!");
});

app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clothings", clothingRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/mannequins", mannequinRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
