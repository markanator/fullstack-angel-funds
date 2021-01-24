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
// import { Project } from "./Project";
import { User } from "./User";

@ObjectType()
@Entity()
export class Donation extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => Int)
  @Column({ type: "int" })
  amount: number;

  @Field(() => String)
  @CreateDateColumn({
    type: "timestamp",
  })
  createdAt: Date;

  @Column()
  userId: number;

  @Column()
  projectId: number;

  //! RELATIONSHIPS
  @Field(() => User) // expose
  @ManyToOne(() => User, (user) => user.donos)
  donor: User;

  // @ManyToOne(() => Project, (project) => project.id)
  // project: Project;
  //! END RELATIONSHIPS
}
