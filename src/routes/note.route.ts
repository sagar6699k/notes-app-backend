import { createNote, deleteNote, getAllNotes, getNote, searchNotes, updateNote } from "../controller/note.controller";
import { Router } from "express";
const router = Router();

router.post("/notes", createNote);

router.get("/notes", getAllNotes);

router.get("/notes/:id", getNote);

router.put("/notes/:id", updateNote);

router.delete("/notes/:id", deleteNote);

router.post("/notes/search", searchNotes);

export default router;
