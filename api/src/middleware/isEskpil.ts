import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isEskpil: MiddlewareFn<MyContext> = ({ context }, next) => {
    console.log(context.req.session);

    if ((context.req.session as any).user !== "163674707013402620") {
        console.log("Nei");

        throw new Error("You must be Eskpil to perform this action.");
    }

    return next();
};
