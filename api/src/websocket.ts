import { Server } from "socket.io";
import { EventEmitter } from "events";

export declare interface Websocket {
    io: Server;
    emitter: EventEmitter;
}

export class Websocket {
    constructor(io: Server, emitter: EventEmitter) {
        this.io = io;
        this.emitter = emitter;
    }

    async init() {
        this.io.on("connection", (client) => {
            this.emitter.on("data", (data) => console.log(JSON.parse(data)));
        });
    }
}
