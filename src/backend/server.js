import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/User.js"
import cors from "cors";

await mongoose.connect("mongodb://localhost:27017/auth");
//Connection debugging
const db = mongoose.connection;
db.on("error", console.log);

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}))


app.get('/', (req, res) => {
    res.send("ok")
    }
);

app.post('/register', (req, res) => {
    const {email, password} = req.body;
    const user = new User({password, email});
    user.save().then(userInfo => {
        console.log(userInfo)
        res.send("");
    })
    }
)


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
