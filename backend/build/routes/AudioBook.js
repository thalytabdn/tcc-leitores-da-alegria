"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AudioBook_1 = __importDefault(require("../controllers/AudioBook"));
const router = express_1.default.Router();
router.post('/audioBook', AudioBook_1.default.createAudioBook);
router.get('/audioBook/:audioBookId', AudioBook_1.default.readAudioBook);
router.get('/audioBook', AudioBook_1.default.readAll);
router.patch('/audioBook/:audioBookId', AudioBook_1.default.updateAudioBook);
router.delete('/audioBook/:audioBookId', AudioBook_1.default.deleteAudioBook);
module.exports = router;
