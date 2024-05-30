"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchNotes = exports.deleteNote = exports.updateNote = exports.getNote = exports.getAllNotes = exports.createNote = void 0;
const note_model_1 = require("../model/note.model");
const createNote = async (req, res) => {
    const { title, detail } = req.body;
    if (!title || !detail) {
        return res.status(422).json({ error: "Missing property" });
    }
    const noteInput = {
        title,
        detail,
    };
    const noteCreated = await note_model_1.Note.create(noteInput);
    console.log(noteCreated);
    return res.status(201).json(noteCreated);
};
exports.createNote = createNote;
const getAllNotes = async (req, res) => {
    const notes = await note_model_1.Note.find().sort("-createdAt").exec();
    return res.status(200).json(notes);
};
exports.getAllNotes = getAllNotes;
const getNote = async (req, res) => {
    const { id } = req.params;
    const note = await note_model_1.Note.findOne({ _id: id });
    if (!note) {
        return res.status(404).json({ message: `Note with id "${id}" not found.` });
    }
    return res.status(200).json(note);
};
exports.getNote = getNote;
const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, detail } = req.body;
    const note = await note_model_1.Note.findOne({ _id: id });
    if (!note) {
        return res.status(404).json({ message: `Note with id "${id}" not found.` });
    }
    if (!title || !detail) {
        return res
            .status(422)
            .json({ message: "The fields title and detail are required" });
    }
    await note_model_1.Note.updateOne({ _id: id }, { title, detail });
    const noteUpdated = await note_model_1.Note.findById(id, { title, detail });
    return res.status(200).json(noteUpdated);
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    const { id } = req.params;
    await note_model_1.Note.findByIdAndDelete(id);
    return res.status(200).json({ message: "Note deleted successfully." });
};
exports.deleteNote = deleteNote;
const searchNotes = async (req, res) => {
    const { query } = req.query; // Assume "query" is the search term
    // if (!query) {
    //   return res.status(400).json({ error: "No search query provided" });
    // }
    try {
        const notes = await note_model_1.Note.find({
            $or: [
                { title: { $regex: query, $options: "i" } }, // Case-insensitive search in title
                { detail: { $regex: query, $options: "i" } }, // Case-insensitive search in detail
            ],
        })
            .sort("-createdAt")
            .exec();
        return res.status(200).json(notes);
    }
    catch (error) {
        return res
            .status(500)
            .json({ error: "Failed to fetch notes", details: error });
    }
};
exports.searchNotes = searchNotes;
