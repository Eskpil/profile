import { ID, ObjectType, Field } from "type-graphql";
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "skills" })
export class Skill extends BaseEntity {
    @Field(() => ID!)
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field()
    @Column()
    skill: string;

    @Field()
    @Column({ type: "text" })
    description: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
