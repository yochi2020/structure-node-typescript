import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { OrderItem } from "./order-item.Entity";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name:"first_name" })
        firstName:string;

    @Column({ name:"last_name" })
        lastName:string;

    @Column()
        email:string;

    @CreateDateColumn({ name:"created_at" })
        createdAt:string;

        @OneToMany(()=>OrderItem,(orderItem)=>orderItem.order)
            orderItem:OrderItem[];
}