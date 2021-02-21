import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class UserType {
    @Field(() => ID!)
    _id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    avatar: string;

    @Field(() => String)
    createdAt: Date;
}
