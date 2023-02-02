"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router_1 = __importDefault(require("./src/router"));
const errorMiddleware = require('./src/middlewares/error-middleware');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router_1.default);
app.use(errorMiddleware);
const db = require('./src/models');
db.sequelize.sync();
const start = () => __awaiter(this, void 0, void 0, function* () {
    try {
        app.listen(PORT, () => console.log(`server started on port = ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
start();
//# sourceMappingURL=index.js.map