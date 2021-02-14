import { Field, ObjectType } from "type-graphql";
import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity({ name: "users" })
export class User extends BaseEntity {
    @Field()
    @PrimaryColumn()
    id: string;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    email: string;

    @Field()
    @Column()
    avatar: string;

    @Field()
    @Column({ default: 1 })
    tokenVersion: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
