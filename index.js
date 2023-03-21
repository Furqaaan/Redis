const express = require("express");
const app = express();
const redis = require("redis");
const cors = require("cors");

app.use(express.json());
app.use(
    cors({
        origin: "*",
    })
);

const redisClient = redis.createClient("redis://172.25.13.158:6379");

redisClient
    .connect()
    .then(async (res) => {
        console.log("Redis connected");
    })
    .catch((err) => {
        console.log("Redis error" + err);
    });

app.post("/set", async (req, res) => {
    const { key, value } = req.body;

    const data = await redisClient.set(key, value);

    if (data === "OK") res.sendStatus(200);
    else res.sendStatus(500);
});

app.get("/get", async (req, res) => {
    const { key } = req.body;

    const data = await redisClient.get(key);

    if (data) res.json(data);
    else res.sendStatus(500);
});

app.listen(3000, () => {
    console.log("Server listening on 3000");
});
