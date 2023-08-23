import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Member")
export default class Member extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  katakanaName: string;

  @Column()
  email: string;
}
