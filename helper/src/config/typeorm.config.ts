import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Contract } from "src/contract/contract.entity";
import { Customer } from "src/customer/customer.entity";
import { Payment } from "src/payment/payment.entity";
import { Vendor } from "src/vendor/vendor.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'contract-platform',
    entities: [Customer, Payment, Contract, Vendor],
    synchronize: false,
}