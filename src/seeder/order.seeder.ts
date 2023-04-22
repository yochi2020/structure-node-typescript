import { createConnection,getRepository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Order } from "@entity/index";
import { OrderItem } from "@src/entity/order-item.Entity";
import { randomInt } from "crypto";
createConnection().then(async ()=>{
    const orderRepository = getRepository(Order);
    const orderItemRepository = getRepository(OrderItem);

    for(let i =0; i<30; i++ ){
        const order = await orderRepository.save({
            firstName:faker.name.firstName(),
            lastName:faker.name.lastName(),
            email:faker.internet.email(),
        });

        for(let j = 0; j<randomInt(1,5);j++){
            await orderItemRepository.save({
                order,
                productTitle:faker.lorem.words(2),
                price:randomInt(10,100),
                quantity:randomInt(1,5)
            });
        }
    }
    process.exit(0);
});