import jwt, { SignOptions } from 'jsonwebtoken';
import { Response } from 'express';
import { IUser } from '../models/user.model';

export const generateAccessToken = (id: string) => {
    const options: SignOptions = {
        expiresIn: (process.env.ACCESS_TOKEN_EXPIRY as jwt.SignOptions['expiresIn']) || '15m',
    };
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET as string, options);
};

export const generateRefreshToken = (id: string) => {
    const options: SignOptions = {
        expiresIn: (process.env.REFRESH_TOKEN_EXPIRY as jwt.SignOptions['expiresIn']) || '7d',
    };
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET as string, options);
};

export const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Remove password from output
    user.password = '';

    res.status(statusCode).json({
        success: true,
        accessToken,
        refreshToken,
        user,
    });
};
