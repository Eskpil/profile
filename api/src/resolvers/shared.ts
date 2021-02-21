import { Ctx, Query, Resolver } from "type-graphql";
import { UserType } from "../graphql/user";
import { User } from "../models/user";
import { MyContext } from "../types";

@Resolver()
export class SharedResolver {
    @Query(() => String)
    async hello(@Ctx() { emitter }: MyContext) {
        emitter.emit("data", JSON.stringify({ data: "You suck" }));

        return "Hello world";
    }

    @Query(() => UserType, { nullable: true })
    async me(@Ctx() { req }: MyContext) {
        console.log(req.session);

        const user = await User.findOne({ _id: (req.session as any).user });

        console.log(user);

        return user;
    }
}
