import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import User from "./models/User.js"
import cors from "cors";
import jwt from "jsonwebtoken";

const secret = "secret123"

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

app.get("/user", (req, res) => {
    const payload = jwt.verify(req.cookies.token, secret);
    User.findById(payload.id)
    .then(userInfo => {
        res.json({id:userInfo._id, email: userInfo.email});
    })
}); 

app.post('/Legister', (req, res) => {
    const {email, password} = req.body;
    const user = new User({password, email});
    user.save().then(userInfo => {
        jwt.sign({id: userInfo._id, email:userInfo.email}, secret, (err, token) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.cookie("token", token).json({id: userInfo._id, email: userInfo.email});
            }
        })
    })
    }
)


app.post('/Login', (req, res) => {
    const {email, password} = req.body;
    User.finOne({})
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
