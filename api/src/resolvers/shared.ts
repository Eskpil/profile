import { Ctx, Query, Resolver } from "type-graphql";
import { User } from "../entities/user";
import { MyContext } from "../types";

@Resolver()
export class SharedResolver {
    @Query(() => String)
    async hello(@Ctx() { emitter }: MyContext) {
        emitter.emit("data", JSON.stringify({ data: "You suck" }));

        return "Hello world";
    }

    @Query(() => User, { nullable: true })
    async me(@Ctx() { req }: MyContext) {
        const user = await User.findOne({
            where: { id: (req.session as any).user },
        });

        return user;
    }
}
