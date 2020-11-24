import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Upvote } from "./Upvote";
import { User } from "./User";

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  images: string[];

  @Field()
  @Column({ type: "int" })
  fund_target!: number;

  @Field()
  @Column()
  publish_date!: Date;

  @Field()
  @Column()
  target_date!: Date;

  @Field()
  @Column({ type: "int", default: 0 })
  total_donation_sum: number;

  @Field()
  @Column({ type: "int", default: 0 })
  view_count: number;

  @Field()
  @Column({ type: "int", default: 0 })
  vote_points: number;

  @Field()
  @Column()
  author_id!: number;

  // RELATIONSHIPS
  @Field() // expose
  @ManyToOne(() => User, (user) => user.posts)
  author: User; // manyToOne

  @OneToMany(() => Upvote, (upvote) => upvote.project)
  upvotes: Upvote[]; // oneToMany
  // END RELATIONSHIPS

  // GRAPHQL computed field
  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  @Field(() => String)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => String)
  @CreateDateColumn()
  updated_at: Date;
}
