"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
require("./config/mongoose");
const index_middleware_1 = require("./middleware/index.middleware");
const corsOptions_1 = require("./config/corsOptions");
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
const index_api_1 = __importDefault(require("./api/index.api"));
const note_route_1 = __importDefault(require("./routes/note.route"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
if ((process.env.NODE_ENV = "development")) {
    app.use((0, morgan_1.default)("dev"));
}
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)(corsOptions_1.corsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true, limit: "30mb" }));
app.use("/", index_api_1.default);
app.use("/api/", note_route_1.default);
app.use("*", index_middleware_1.notFoundMiddleware);
app.use(index_middleware_1.errorHandlerMiddleware);
exports.default = app;
