import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DataSource } from 'typeorm';
import { customerRepository } from './customer.repository';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
    imports:[
        TypeOrmModule.forFeature([Customer]),
    ],
    controllers:[CustomerController],
    providers: [
        {
            provide: getRepositoryToken(Customer),
            inject: [getDataSourceToken()],
            useFactory(dataSource: DataSource) {
                return dataSource.getRepository(Customer).extend(customerRepository);
            }
        },
        CustomerService,
    ],
    exports: [CustomerService]
})
export class CustomerModule {}
