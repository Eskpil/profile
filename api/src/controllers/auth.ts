import { Request, Response } from "express";
import { Client, Payload } from "@india-project/discord-oauth";
import { getConnection } from "typeorm";
import { User } from "../entities/user";
import {
    createAccessToken,
    createRefreshToken,
    sendRefreshToken,
} from "../utils/auth";
import { Decode } from "../utils/decode";

const client = new Client({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    callback: process.env.CALLBACK as string,
    version: "8",
    scopes: ["identify", "email"],
});

class AuthController {
    async auth(req: Request, res: Response) {
        return client.authenticate(req, res);
    }

    async callback(req: Request, res: Response) {
        const { user }: Payload = await client.callback(req);
        let response;

        const check = await User.findOne({ where: { id: parseInt(user.id) } });

        if (check) {
            await User.update(
                { id: user.id },
                {
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email!,
                }
            );

            (req.session as any).user = check.id;

            return res.redirect("http://localhost:8080");
        }

        try {
            const raw = await getConnection()
                .createQueryBuilder()
                .insert()
                .into(User)
                .values({
                    id: user.id,
                    avatar: user.avatar,
                    username: user.username,
                    email: user.email!,
                })
                .returning("*")
                .execute();
            console.log(raw);
            response = raw.raw[0];
        } catch (err) {
            console.log(err);
        }

        if (!response) {
            return res.redirect("http://localhost:8080");
        }

        (req.session as any).user = user.id;

        return res.redirect("http://localhost:8080");
    }

    async token(req: Request, res: Response) {
        const token = req.cookies.jid;
        if (!token) {
            return res.send({ ok: false, accessToken: "" });
        }

        let payload = await Decode.refresh(token);

        const user = await User.findOne({ where: { id: payload?.user } });

        if (!user) {
            return res.send({ ok: false, accessToken: "" });
        }

        if (user.tokenVersion !== payload?.tokenVersion) {
            return res.send({ ok: false, accessToken: "" });
        }

        sendRefreshToken(res, createRefreshToken(user));

        return res.send({ ok: true, accessToken: createAccessToken(user) });
    }
}

export const AuthRoutes = new AuthController();
