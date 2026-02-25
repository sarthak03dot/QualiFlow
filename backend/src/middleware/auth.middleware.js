"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = (await user_model_1.default.findById(decoded.id).select('-password'));
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            next(new Error('Not authorized, token failed'));
        }
    }
    if (!token) {
        res.status(401);
        next(new Error('Not authorized, no token'));
    }
};
exports.protect = protect;
