import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Customer } from "src/customer/customer.entity";
import { Vendor } from "src/vendor/vendor.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'contract-platform',
    entities: [Customer, Vendor],
    synchronize: false,
}