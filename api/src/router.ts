import express from "express";
import { AuthController } from "./controllers/auth";
import { FunRoutes } from "./controllers/fun";

export const app = express();

app.get("/auth", AuthController.auth);
app.get("/auth/callback", AuthController.callback);
app.get("/fun/background", FunRoutes.nasaImage);
