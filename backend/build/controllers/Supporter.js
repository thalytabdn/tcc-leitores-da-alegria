'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const Supporter_1 = __importDefault(require('../models/Supporter'));
const createSupporter = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, image } = req.body;
    const supporter = new Supporter_1.default({
      _id: new mongoose_1.default.Types.ObjectId(),
      name,
      description,
      image
    });
    try {
      const supporter_1 = yield supporter.save();
      return res.status(201).json({ supporter });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
const readSupporter = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const supporterId = req.params.supporterId;
    try {
      const supporter = yield Supporter_1.default.findById(supporterId);
      return supporter ? res.status(200).json({ supporter }) : res.status(404).json({ message: 'Not Found' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
const readAll = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const supporters = yield Supporter_1.default.find();
      return res.status(200).json({ supporters });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
const updateSupporter = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const supporterId = req.params.supporterId;
    return Supporter_1.default
      .findById(supporterId)
      .then((supporter) => {
        if (supporter) {
          supporter.set(req.body);
          return supporter
            .save()
            .then((supporter) => res.status(201).json({ supporter }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          res.status(404).json({ message: 'Not found' });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });
const deleteSupporter = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const supporterId = req.params.supporterId;
    return Supporter_1.default
      .findByIdAndDelete(supporterId)
      .then((supporter) => (supporter ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
      .catch((error) => res.status(500).json({ error }));
  });
exports.default = { createSupporter, readAll, readSupporter, updateSupporter, deleteSupporter };
