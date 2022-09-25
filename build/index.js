"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var response_type_1 = require("./types/response.type");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
var AsteroidHandler_1 = __importDefault(require("./Handlers/AsteroidHandler"));
dotenv_1.default.config();
// const privateKey = fs.readFileSync("./server.key", "utf8");
// const certificate = fs.readFileSync("./server.crt", "utf8");
// const credentials = { key: privateKey, cert: certificate };
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use(body_parser_1.default.urlencoded({ limit: "200mb", extended: true }));
exports.app.use(body_parser_1.default.json({ limit: "200mb" }));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "assets")));
exports.app.get("/", function (_req, res) {
    res.send({ message: "Hello!" });
});
exports.app.get("/asteroids", function (req, res) {
    var _a = req.query, startDate = _a.startDate, endDate = _a.endDate;
    AsteroidHandler_1.default.handleFetchAllAsteroidsByDates(startDate, endDate)
        .then(function (handlerResponse) {
        res.send({
            status: response_type_1.SuccessResponseEnum.OK,
            statusCode: 200,
            data: handlerResponse.data,
            message: handlerResponse.message,
        });
    })
        .catch(function (err) {
        res.send({
            status: response_type_1.ErrorResponseEnum.BAD_REQUEST,
            statusCode: 400,
            message: err === null || err === void 0 ? void 0 : err.message,
        });
    });
});
var httpServer = http_1.default.createServer(exports.app);
// const httpsServer = https.createServer(credentials, app);
httpServer.listen(8888);
