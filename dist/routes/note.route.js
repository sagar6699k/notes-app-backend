"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_controller_1 = require("../controller/note.controller");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post("/notes", note_controller_1.createNote);
router.get("/notes", note_controller_1.getAllNotes);
router.get("/notes/:id", note_controller_1.getNote);
router.put("/notes/:id", note_controller_1.updateNote);
router.delete("/notes/:id", note_controller_1.deleteNote);
router.post("/notes/search", note_controller_1.searchNotes);
exports.default = router;
//# sourceMappingURL=note.route.js.map