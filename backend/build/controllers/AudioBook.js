"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AudioBook_1 = __importDefault(require("../models/AudioBook"));
const createAudioBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, url } = req.body;
    const audioBook = new AudioBook_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        description,
        url
    });
    try {
        const audioBook_1 = yield audioBook.save();
        return res.status(201).json({ audioBook });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAudioBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const audioBookId = req.params.audioBookId;
    try {
        const audioBook = yield AudioBook_1.default.findById(audioBookId);
        return audioBook ? res.status(200).json({ audioBook }) : res.status(404).json({ message: 'Not Found' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const audioBooks = yield AudioBook_1.default.find();
        return res.status(200).json({ audioBooks });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateAudioBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const audioBookId = req.params.audioBookId;
    return AudioBook_1.default.findById(audioBookId)
        .then((audioBook) => {
        if (audioBook) {
            audioBook.set(req.body);
            return audioBook
                .save()
                .then((audioBook) => res.status(201).json({ audioBook }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const deleteAudioBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const audioBookId = req.params.audioBookId;
    return AudioBook_1.default.findByIdAndDelete(audioBookId)
        .then((audioBook) => (audioBook ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createAudioBook, readAll, readAudioBook, updateAudioBook, deleteAudioBook };
