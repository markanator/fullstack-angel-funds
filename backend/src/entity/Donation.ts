import { Field, Int, ObjectType } from "type-graphql";
import {
  Entity,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
// locals
import { Project, User } from "./";

@ObjectType()
@Entity()
export class Donation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Int)
  @Column({ type: "int" })
  amount: number;

  @Field()
  @Column()
  s_created: string;

  @Field()
  @Column()
  c_id: string;

  @Field()
  @Column()
  s_receipt_url: string;

  @Field(() => String)
  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @Column({ type: "int" })
  userId: number;

  @Column({ type: "int" })
  projectId: number;

  //! RELATIONSHIPS
  @Field(() => User) // expose
  @ManyToOne(() => User, (user) => user.donos)
  donor: User;

  @Field(() => Project) // expose
  @ManyToOne(() => Project, (project) => project.donations)
  project: Project;
  //! END RELATIONSHIPS
}
