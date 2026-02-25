"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const responseSchema = new mongoose_1.default.Schema({
    survey: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'Survey',
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
    answers: {
        type: Map,
        of: mongoose_1.default.Schema.Types.Mixed,
        required: true,
    },
    status: {
        type: String,
        enum: ['eligible', 'ineligible'],
        required: true,
    },
}, {
    timestamps: true,
});
const ResponseModel = mongoose_1.default.model('Response', responseSchema);
exports.default = ResponseModel;
