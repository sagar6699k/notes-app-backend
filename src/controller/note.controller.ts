import { Request, Response } from "express";
import { INotes, Note } from "../model/note.model";

const createNote = async (req: Request, res: Response) => {
  const { title, detail } = req.body;

  if (!title || !detail) {
    return res.status(422).json({ error: "Missing property" });
  }

  const noteInput: INotes = {
    title,
    detail,
  };

  const noteCreated = await Note.create(noteInput);
  console.log(noteCreated);

  return res.status(201).json(noteCreated);
};

const getAllNotes = async (req: Request, res: Response) => {
  const notes = await Note.find().sort("-createdAt").exec();
  return res.status(200).json(notes);
};

const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  const note = await Note.findOne({ _id: id });

  if (!note) {
    return res.status(404).json({ message: `Note with id "${id}" not found.` });
  }

  return res.status(200).json(note);
};

const updateNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, detail } = req.body;

  const note = await Note.findOne({ _id: id });

  if (!note) {
    return res.status(404).json({ message: `Note with id "${id}" not found.` });
  }

  if (!title || !detail) {
    return res
      .status(422)
      .json({ message: "The fields title and detail are required" });
  }

  await Note.updateOne({ _id: id }, { title, detail });

  const noteUpdated = await Note.findById(id, { title, detail });

  return res.status(200).json(noteUpdated);
};

const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Note.findByIdAndDelete(id);

  return res.status(200).json({ message: "Note deleted successfully." });
};

const searchNotes = async (req: Request, res: Response) => {
  const { query } = req.query; // Assume "query" is the search term

  // if (!query) {
  //   return res.status(400).json({ error: "No search query provided" });
  // }

  try {
    const notes = await Note.find({
      $or: [
        { title: { $regex: query as string, $options: "i" } }, // Case-insensitive search in title
        { detail: { $regex: query as string, $options: "i" } }, // Case-insensitive search in detail
      ],
    })
      .sort("-createdAt")
      .exec();

    return res.status(200).json(notes);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch notes", details: error });
  }
};

export { createNote, getAllNotes, getNote, updateNote, deleteNote, searchNotes };
