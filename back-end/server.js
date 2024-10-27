const express = require("express");
const app = express();
const port = 8000;
const connectDB = require("./db/dbconnection.js");
const User = require("./db/user.js");
const cors = require('cors');
// const { sendMail } = require("./db/sendMail.js");

// Middleware for parsing JSON
app.use(express.json());

//Enable cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Registration route
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log(req.body);

        if (!username || !email || !password) {
            console.log("Missing fields");
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();

        res.status(201).json({ message: "Registration Successful", success: true });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Registration Failed", success: false });
    }
});

// Login

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email", success: false });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password", success: false });
        }

        res.status(200).json({ message: "Login successful", success: true });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Login failed", success: false });
    }
});

// Connect to the database
connectDB()

// Start the server
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});
