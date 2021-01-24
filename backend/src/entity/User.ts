import { Field, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  Index,
} from "typeorm";
import { Donation } from "./Donation";
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
  @Column({ default: "" })
  avatarUrl: string;

  @Field()
  @Column({ unique: true })
  @Index()
  email!: string;

  @Column()
  password!: string;

  // Relationships
  @OneToMany(() => Project, (project) => project.author)
  posts: Project[];

  @OneToMany(() => Upvote, (upvote) => upvote.user)
  upvotes: Upvote[];

  @OneToMany(() => Donation, (dono) => dono.donor)
  donos: Donation[];
  // END Relationships

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @CreateDateColumn()
  updated_at: Date;
}
