import Note from "../models/Note.js";

export async function getAllNotes (_,res) {
    try {
        const notes= await Note.find().sort({createdAt: -1}); 
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function getNoteById (req,res) {
    try {
        const notes= await Note.findById(req.params.id);
        if(!notes) return res(404).json({message:"Note not found"});
        res.status(200).json(notes);
    } catch (error) {
        console.error("Error in getNoteBYId controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export  async function createNote(req,res) {
    try {
        const {title,content} = req.body;
        const newNote= new Note ({title,content});
        const savednote= await newNote.save();
        res.status(201).json(savednote);
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function updateNote(req,res) {
    try {
        const {title,content} = req.body;
        const updatedNote= await Note.findByIdAndUpdate(req.params.id, {title,content},{new: true,});
        if (!updatedNote) return res(404).json({message:"Note not found"});  
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error("Error in updateNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export async function deleteNote (req,res) {
    try {
        const {title,content} = req.body;
        const deletedNote= await Note.findByIdAndDelete(req.params.id, {title,content},{new: true});
        if (!deletedNote) return res(404).json({message:"Note not found"});
        res.status(200).json({message:" note deleted successfully"});
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({message:"Internal Server Error"});
    }
}