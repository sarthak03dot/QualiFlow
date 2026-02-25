"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refreshToken = exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const generateTokens_1 = require("../utils/generateTokens");
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters'),
});
const registerUser = async (req, res, next) => {
    console.log(req.body);
    try {
        const validatedData = registerSchema.parse(req.body);
        const { name, email, password } = validatedData;
        const userExists = await user_model_1.default.findOne({ email });
        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }
        const user = await user_model_1.default.create({
            name,
            email,
            password,
        });
        if (user) {
            (0, generateTokens_1.sendTokenResponse)(user, 201, res);
        }
        else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    }
    catch (error) {
        next(error);
        console.log(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const validatedData = loginSchema.parse(req.body);
        const { email, password } = validatedData;
        const user = await user_model_1.default.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            (0, generateTokens_1.sendTokenResponse)(user, 200, res);
        }
        else {
            res.status(401);
            throw new Error('Invalid email or password');
        }
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(401);
            throw new Error('Refresh token is required');
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await user_model_1.default.findById(decoded.id);
        if (!user) {
            res.status(401);
            throw new Error('User not found');
        }
        const accessToken = (0, generateTokens_1.generateAccessToken)(user._id.toString());
        res.json({
            success: true,
            accessToken,
        });
    }
    catch (error) {
        res.status(401);
        next(new Error('Invalid refresh token'));
    }
};
exports.refreshToken = refreshToken;
const logout = async (req, res, next) => {
    res.status(200).json({ success: true, message: 'Logged out successfully' });
};
exports.logout = logout;
