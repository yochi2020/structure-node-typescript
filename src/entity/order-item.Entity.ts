import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Order } from "./order.Entity";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
        id: number;

    @Column({ name:"product_title" })
        productTitle:string;

    @Column()
        price:number;

    @Column()
        quantity:number;

    @ManyToOne(()=>Order,(order)=>order.orderItem)
    @JoinColumn({
        name:"order_id"
    })
        order:Order;
}