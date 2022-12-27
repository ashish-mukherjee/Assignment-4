"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = require("body-parser");
const fs = require('fs');
const app = (0, express_1.default)();
//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const index_1 = __importDefault(require("./routes/index"));
app.use(index_1.default);
app.listen(2900);
console.log("server on port 2900");
