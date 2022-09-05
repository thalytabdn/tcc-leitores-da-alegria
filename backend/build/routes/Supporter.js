"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Supporter_1 = __importDefault(require("../controllers/Supporter"));
const router = express_1.default.Router();
router.post('/supporter', Supporter_1.default.createSupporter);
router.get('/supporter/:supporterId', Supporter_1.default.readSupporter);
router.get('/supporter', Supporter_1.default.readAll);
router.patch('/supporter/:supporterId', Supporter_1.default.updateSupporter);
router.delete('/supporter/:supporterId', Supporter_1.default.deleteSupporter);
module.exports = router;
