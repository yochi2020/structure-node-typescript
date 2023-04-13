import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Role } from "./role.Entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        first_name: string;

    @Column()
        last_name: string;

    @Column({ unique:true })
        email: string;

    @Column()
        password: string;

    @ManyToOne(()=>Role)
    @JoinColumn({ name:"role_id" })
        role:Role;
}