"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Member_1 = __importDefault(require("../controllers/Member"));
const router = express_1.default.Router();
router.post('/member', Member_1.default.createMember);
router.get('/member/:memberId', Member_1.default.readMember);
router.get('/member', Member_1.default.readAll);
router.patch('/member/:memberId', Member_1.default.updateMember);
router.delete('/member/:memberId', Member_1.default.deleteMember);
module.exports = router;
