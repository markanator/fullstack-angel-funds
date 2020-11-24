import { Entity, Column, BaseEntity, PrimaryColumn, ManyToOne } from "typeorm";
// locals
import { Project } from "./Project";
import { User } from "./User";

@Entity()
export class Upvote extends BaseEntity {
  @Column({ type: "int" })
  value: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.upvotes)
  user: User;

  @PrimaryColumn()
  projectId: number;

  @ManyToOne(() => Project, (project) => project.upvotes)
  project: Project;
}
