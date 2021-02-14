import { verify } from "jsonwebtoken";

interface refreshPayload {
    user: string;
    tokenVersion: number;
}

class DecodeClass {
    async access(token: string): Promise<String | null> {
        return new Promise((res, rej) => {
            try {
                const payload: any = verify(
                    token,
                    process.env.ACCESS_TOKEN_SECRET!
                );
                res(payload.user);
            } catch (err) {
                rej();
            }
        });
    }

    async refresh(token: string): Promise<refreshPayload | null> {
        return new Promise((res, rej) => {
            try {
                const payload: any = verify(
                    token,
                    process.env.REFRESH_TOKEN_SECRET!
                );
                res({ user: payload.user, tokenVersion: payload.tokenVersion });
            } catch (err) {
                rej();
            }
        });
    }
}

export const Decode = new DecodeClass();
