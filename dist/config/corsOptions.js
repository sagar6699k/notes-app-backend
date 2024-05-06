"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
const allowedOrigins = [
    "http://localhost:3000",
    "http://192.168.1.2:3000",
];
exports.corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    credentials: true,
    optionsSuccessStatus: 200,
};
//# sourceMappingURL=corsOptions.js.map