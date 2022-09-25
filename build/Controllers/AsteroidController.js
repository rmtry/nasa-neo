"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
var node_querystring_1 = __importDefault(require("node:querystring"));
var findAsteroids = function (startDate, endDate) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var numberOfDays, data, error, queryStringObject, queryCycles, cycle, nextStartDate, nextEndDate, url, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    numberOfDays = moment_1.default.duration(endDate.diff(startDate)).asDays();
                    error = undefined;
                    queryStringObject = {
                        start_date: startDate.format("YYYY-MM-DD"),
                        end_date: endDate ? endDate.format("YYYY-MM-DD") : undefined,
                        api_key: process.env.API_KEY,
                    };
                    queryCycles = numberOfDays / 8;
                    cycle = 0;
                    _a.label = 1;
                case 1:
                    nextStartDate = (0, moment_1.default)(startDate).add(8 * cycle, "days");
                    nextEndDate = (0, moment_1.default)(startDate).add(8 * (cycle + 1) - 1, "days");
                    queryStringObject.start_date = nextStartDate.format("YYYY-MM-DD");
                    // if nextEndDate is after the endDate specified, use the endDate
                    queryStringObject.end_date = nextEndDate.isAfter(endDate)
                        ? endDate.format("YYYY-MM-DD")
                        : nextEndDate.format("YYYY-MM-DD");
                    url = "https://api.nasa.gov/neo/rest/v1/feed?".concat(node_querystring_1.default.stringify(queryStringObject));
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    console.log("cycle", cycle, url);
                    return [4 /*yield*/, axios_1.default.get(url)];
                case 3:
                    response = _a.sent();
                    if (!data) {
                        data = response.data;
                    }
                    else {
                        data.element_count = data.element_count + response.data.element_count;
                        // merge near_earth_objects data with the existing data
                        data.near_earth_objects = __assign(__assign({}, data.near_earth_objects), response.data.near_earth_objects);
                    }
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    error = err_1;
                    // stop the loop if an API call failed
                    return [3 /*break*/, 7];
                case 5:
                    cycle++;
                    _a.label = 6;
                case 6:
                    if (cycle <= queryCycles) return [3 /*break*/, 1];
                    _a.label = 7;
                case 7:
                    if (data) {
                        resolve({ data: data, message: error === null || error === void 0 ? void 0 : error.message });
                    }
                    else {
                        reject(error);
                    }
                    return [2 /*return*/];
            }
        });
    }); });
};
exports.default = { findAsteroids: findAsteroids };
