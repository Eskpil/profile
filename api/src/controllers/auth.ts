import { Request, Response } from "express";
import { Client, Payload } from "@india-project/discord-oauth";
import { User } from "../models/user";

const client = new Client({
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    callback: process.env.CALLBACK as string,
    version: "8",
    scopes: ["identify", "email"],
});

export class AuthController {
    static async auth(req: Request, res: Response) {
        return client.authenticate(req, res);
    }

    static async callback(req: Request, res: Response) {
        const { user: profile }: Payload = await client.callback(req);

        try {
            const user = await User.findOne({ _id: profile.id });
            if (user) {
                console.log("User exists.");
                await user.updateOne({
                    username: `${profile.username}#${profile.discriminator}`,
                    avatar: profile.avatar,
                    email: profile.email!,
                });
                (req.session as any).user = profile.id;
                res.redirect("http://localhost:8080");
            } else {
                console.log("User does not exist");
                await User.create({
                    _id: profile.id,
                    username: profile.username,
                    avatar: profile.avatar,
                    email: profile.email!,
                });

                (req.session as any).user = profile.id;
                res.redirect("http://localhost:8080");
            }
        } catch (err) {
            console.log(err);
        }
    }
}
