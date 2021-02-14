import express from "express";
import { AuthRoutes } from "./controllers/auth";
import { FunRoutes } from "./controllers/fun";

export const app = express();

app.get("/auth", AuthRoutes.auth);
app.get("/auth/callback", AuthRoutes.callback);
app.patch("/auth/token", AuthRoutes.token);
app.get("/fun/background", FunRoutes.nasaImage);
