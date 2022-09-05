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
const Event_1 = __importDefault(require("../models/Event"));
const createEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { local, date, time, readersName, bookName, bookImage, bookDescription } = req.body;
    const event = new Event_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        local,
        date,
        time,
        readersName,
        bookName,
        bookImage,
        bookDescription
    });
    try {
        const event_1 = yield event.save();
        return res.status(201).json({ event });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    try {
        const event = yield Event_1.default.findById(eventId);
        return event ? res.status(200).json({ event }) : res.status(404).json({ message: 'Not Found' });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield Event_1.default.find();
        return res.status(200).json({ events });
    }
    catch (error) {
        return res.status(500).json({ error });
    }
});
const updateEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    return Event_1.default.findById(eventId)
        .then((event) => {
        if (event) {
            event.set(req.body);
            return event
                .save()
                .then((event) => res.status(201).json({ event }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'Not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
});
const deleteEvent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const eventId = req.params.eventId;
    return Event_1.default.findByIdAndDelete(eventId)
        .then((event) => (event ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
});
exports.default = { createEvent, readAll, readEvent, updateEvent, deleteEvent };
