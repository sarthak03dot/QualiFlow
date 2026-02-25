"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendTokenResponse = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (id) => {
    const options = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };
    return jsonwebtoken_1.default.sign({ id }, process.env.ACCESS_TOKEN_SECRET, options);
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (id) => {
    const options = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    };
    return jsonwebtoken_1.default.sign({ id }, process.env.REFRESH_TOKEN_SECRET, options);
};
exports.generateRefreshToken = generateRefreshToken;
const sendTokenResponse = (user, statusCode, res) => {
    const accessToken = (0, exports.generateAccessToken)(user._id.toString());
    const refreshToken = (0, exports.generateRefreshToken)(user._id.toString());
    // Remove password from output
    user.password = '';
    res.status(statusCode).json({
        success: true,
        accessToken,
        refreshToken,
        user,
    });
};
exports.sendTokenResponse = sendTokenResponse;
