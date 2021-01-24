import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Donation } from "./Donation";
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
  @Column({ default: "" })
  @Index()
  category!: string;

  @Field()
  @Column({ default: "" })
  image: string;

  @Field()
  @Column({ default: "" })
  @Index()
  slug: string;

  @Field()
  @Column({ type: "int" })
  fundTarget!: number;

  @Field()
  @Column({ type: "int", default: 0 })
  currentFunds!: number;

  @Field(() => String)
  @Column()
  publishDate!: Date;

  @Field(() => String)
  @Column()
  targetDate!: Date;

  @Field()
  @Column({ type: "int", default: 0 })
  // TODO make this a fieldresolver?
  totalDonation_sum: number;

  @Field()
  @Column({ type: "int", default: 0 })
  viewCount: number;

  @Field()
  @Column({ type: "int", default: 0 })
  votePoints: number;

  @Field()
  @Column()
  authorId!: number;

  // RELATIONSHIPS
  @Field(() => User) // expose
  @ManyToOne(() => User, (user) => user.posts)
  author: User; // manyToOne

  @OneToMany(() => Upvote, (upvote) => upvote.project)
  upvotes: Upvote[]; // oneToMany

  @Field(() => Donation, { nullable: true })
  @ManyToMany(() => Donation)
  @JoinTable()
  donations: Donation[]; // oneToMany
  // END RELATIONSHIPS

  // GRAPHQL computed field
  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  @Field(() => String)
  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({
    type: "timestamp",
  })
  updatedAt: Date;
}
