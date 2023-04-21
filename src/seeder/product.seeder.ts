import { createConnection,getRepository } from "typeorm";
import { faker } from "@faker-js/faker";
import { Product } from "@entity/index";
createConnection().then(async ()=>{
    const repository = getRepository(Product);

    for(let i =0; i<30; i++ ){
        await repository.save({
            title:faker.commerce.productName(),
            description:faker.commerce.productDescription(),
            image:faker.image.imageUrl(),
            price:Number(faker.commerce.price())
        });
    }
    process.exit(0);
});