"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const MONGO_DB_URI = process.env.MONGO_DB_URI;
// connection to db
(async () => {
    try {
        (0, mongoose_1.set)("strictQuery", false);
        const db = await (0, mongoose_1.connect)(MONGO_DB_URI);
        console.log("MongoDB connected to", db.connection.name);
    }
    catch (error) {
        console.error(error);
    }
})();
//# sourceMappingURL=mongoose.js.map