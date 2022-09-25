import express from "express";
import bodyParser from "body-parser";

import http from "http";
import path from "path";
import { ErrorResponseEnum, SuccessResponseEnum } from "./types/response.type";

import cors from "cors";
import dotenv from "dotenv";
import AsteroidHandler from "./Handlers/AsteroidHandler";
dotenv.config();
// const privateKey = fs.readFileSync("./server.key", "utf8");
// const certificate = fs.readFileSync("./server.crt", "utf8");
// const credentials = { key: privateKey, cert: certificate };

export const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
app.use(bodyParser.json({ limit: "200mb" }));

app.use(express.static(path.join(__dirname, "assets")));

app.get("/", function (_req, res) {
  res.send({ message: "Hello!" });
});

app.get("/asteroids", function (req, res) {
  const { startDate, endDate } = req.query;

  AsteroidHandler.handleFetchAllAsteroidsByDates(startDate, endDate)
    .then((handlerResponse) => {
      res.send({
        status: SuccessResponseEnum.OK,
        statusCode: 200,
        data: handlerResponse.data,
        message: handlerResponse.message,
      });
    })
    .catch((err) => {
      res.send({
        status: ErrorResponseEnum.BAD_REQUEST,
        statusCode: 400,
        message: err?.message,
      });
    });
});

const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);
httpServer.listen(8888);
