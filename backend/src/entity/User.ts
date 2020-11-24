import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
// locals
import { Project } from "./Project";
import { Upvote } from "./Upvote";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  fullName: string;

  @Field()
  @Column()
  avatarUrl: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  // Relationships
  @OneToMany(() => Project, (project) => project.author)
  posts: Project[];

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];
  // END Relationships

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @CreateDateColumn()
  updated_at: Date;
}
