import mongoose, { Schema, model } from "mongoose";

export interface INotes {
  title: string;
  detail: string;
}

const noteSchema = new Schema<INotes>(
  {
    title: { type: String, required: true },
    detail: { type: String, default: "" },
  },
  {
    collection: "notes",
    timestamps: true,
  }
);

const Note = model<INotes>("Note", noteSchema);

export { Note };
