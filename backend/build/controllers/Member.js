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
const Member_1 = __importDefault(require('../models/Member'));
const createMember = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, image } = req.body;
    const member = new Member_1.default({
      _id: new mongoose_1.default.Types.ObjectId(),
      name,
      description,
      image
    });
    try {
      const member_1 = yield member.save();
      return res.status(201).json({ member });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
const readMember = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    try {
      const member = yield Member_1.default.findById(memberId);
      return member ? res.status(200).json({ member }) : res.status(404).json({ message: 'Not Found' });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
const readAll = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const members = yield Member_1.default.find();
      return res.status(200).json({ members });
    } catch (error) {
      return res.status(500).json({ error });
    }
  });
const updateMember = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    return Member_1.default
      .findById(memberId)
      .then((member) => {
        if (member) {
          member.set(req.body);
          return member
            .save()
            .then((member) => res.status(201).json({ member }))
            .catch((error) => res.status(500).json({ error }));
        } else {
          res.status(404).json({ message: 'Not found' });
        }
      })
      .catch((error) => res.status(500).json({ error }));
  });
const deleteMember = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params.memberId;
    return Member_1.default
      .findByIdAndDelete(memberId)
      .then((member) => (member ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
      .catch((error) => res.status(500).json({ error }));
  });
exports.default = { createMember, readAll, readMember, updateMember, deleteMember };
