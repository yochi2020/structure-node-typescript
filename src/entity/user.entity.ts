import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./role.Entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name:"first_name" })
        firstName: string;

    @Column({ name:"last_name" })
        lastName: string;

    @Column({ unique:true })
        email: string;

    @Column()
        password: string;

    @ManyToOne(()=>Role)
    @JoinColumn({ name:"role_id" })
        role:Role;
}