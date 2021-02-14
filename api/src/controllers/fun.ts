import { Response, Request } from "express";
import fetch from "node-fetch";

export class FunController {
    async nasaImage(req: Request, res: Response) {
        const data = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`
        ).then((data) => data.json());

        return res.json({ ok: true, data: data.url });
    }
}

export const FunRoutes = new FunController();
