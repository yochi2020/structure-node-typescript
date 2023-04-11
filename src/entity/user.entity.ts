import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}