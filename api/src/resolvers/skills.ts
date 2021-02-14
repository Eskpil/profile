import {
    Arg,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { Skill } from "../entities/skill";
import { isAuth } from "../middleware/isAuth";
import { isEskpil } from "../middleware/isEskpil";
import { FieldError } from "./FieldError";

@ObjectType()
class SkillResponse {
    @Field(() => [FieldError], { nullable: true })
    errors: FieldError[];

    @Field(() => Skill, { nullable: true })
    skill: Skill;
}

@Resolver()
export class SkillsResolver {
    @Query(() => [Skill])
    async skills() {
        return Skill.find();
    }

    @Query(() => Skill, { nullable: true })
    async skill(@Arg("id") id: string) {
        return Skill.findOne({ where: { id } });
    }

    @UseMiddleware(isAuth, isEskpil)
    @Mutation(() => Skill, { nullable: true })
    async registerSkill(
        @Arg("skill") skillName: string,
        @Arg("description") description: string
    ): Promise<Skill | FieldError[]> {
        return Skill.create({ skill: skillName, description }).save();
    }
}
