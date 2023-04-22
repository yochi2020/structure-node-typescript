import { createConnection,getRepository } from "typeorm";
import { Permission, Role } from "@entity/index";

createConnection().then(async ()=>{
    const permissionRepository = getRepository(Permission);

    const parms= ["view_users","edit_users","view_roles","edit_roles","view_products","edit_products","view_orders","edit_orders"];

    const permissions:any=[];

    for(let i=0; i<parms.length;i++){
        permissions.push(await permissionRepository.save({
            name:parms[i],
        }));
    }

    const roleRepository:any = getRepository(Role);

    await roleRepository.save({
        name:"admin",
        permissions
    });


    delete permissions[3];

    await roleRepository.save({
        name:"editor",
        permissions
    });


    delete permissions[1];
    delete permissions[5];
    delete permissions[7];

    await roleRepository.save({
        name:"viewer",
        permissions
    });

    process.exit(0);
});