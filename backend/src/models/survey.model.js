"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const surveySchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    nodes: {
        type: Array,
        default: [],
    },
    edges: {
        type: Array,
        default: [],
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft',
    },
}, {
    timestamps: true,
});
const Survey = mongoose_1.default.model('Survey', surveySchema);
exports.default = Survey;
