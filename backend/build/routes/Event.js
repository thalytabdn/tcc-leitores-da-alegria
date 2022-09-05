"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Event_1 = __importDefault(require("../controllers/Event"));
const router = express_1.default.Router();
router.post('/event', Event_1.default.createEvent);
router.get('/event/:eventId', Event_1.default.readEvent);
router.get('/event', Event_1.default.readAll);
router.patch('/event/:eventId', Event_1.default.updateEvent);
router.delete('/event/:eventId', Event_1.default.deleteEvent);
module.exports = router;
