import { User } from "../entities/user";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const createAccessToken = (user: User) => {
    return sign({ user: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: "15m",
    });
};

export const createRefreshToken = (user: User) => {
    return sign(
        { user: user.id, tokenVersion: user.tokenVersion },
        process.env.REFRESH_TOKEN_SECRET!,
        {
            expiresIn: "7d",
        }
    );
};

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/api/auth/token",
        sameSite: "lax",
    });
};
