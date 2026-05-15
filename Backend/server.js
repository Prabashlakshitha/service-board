require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobs");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.status(200).json({ success: true, message: "GlobalTNA API is running" });
});

app.use("/api/jobs", jobRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("  MongoDB connected");
        app.listen(PORT, () => {
            console.log(`  Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("  Failed to connect to MongoDB:", err.message);
        process.exit(1);
    }
};

if (require.main === module) {
    startServer();
}

module.exports = { app };