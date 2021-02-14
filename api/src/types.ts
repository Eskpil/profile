import { Response, Request } from "express";
import { EventEmitter } from "typeorm/platform/PlatformTools";

export type MyContext = {
    req: Request;
    res: Response;
    emitter: EventEmitter;
};
