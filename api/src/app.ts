import "dotenv/config";
import "reflect-metadata";

import express from "express";
import { app as Router } from "./router";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { graphqlUploadExpress } from "graphql-upload";
import { buildSchema } from "type-graphql";
import { SharedResolver } from "./resolvers/shared";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { EventEmitter } from "events";
import { Websocket } from "./websocket";
import session from "express-session";
import Redis from "ioredis";
import connectRedis from "connect-redis";
import { COOKIE_NAME } from "./constants";
import { connect } from "mongoose";

(async () => {
    const app = express();

    const server = createServer(app);

    const io = new Server(server);

    const emitter = new EventEmitter();
    const ws = new Websocket(io, emitter);

    const redis = new Redis(process.env.REDIS_URL);
    const RedisStore = connectRedis(session);

    const db = await connect("mongodb://localhost:27017/profile", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    app.use(cors({ origin: ["http://localhost:8080"], credentials: true }));

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax", // csrf
            },
            saveUninitialized: false,
            secret: process.env.ACCESS_TOKEN_SECRET as string,
            resave: false,
        })
    );

    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

    app.use(cookieParser());
    app.use("/api", Router);

    const Apollo = new ApolloServer({
        schema: await buildSchema({
            resolvers: [SharedResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res, emitter }),
    });

    Apollo.applyMiddleware({
        app,
        cors: false,
    });
    ws.init();
    server.listen(4000, () => console.log("Application seated on port 4000"));
})();
