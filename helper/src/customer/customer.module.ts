import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Customer } from './customer.entity';
import { DataSource } from 'typeorm';
import { CustomerRepository, customerRepository } from './customer.repository';

@Module({
    imports:[
        TypeOrmModule.forFeature([Customer]),
    ],
    controllers:[],
    providers: [
        {
            provide: getRepositoryToken(Customer),
            inject: [getDataSourceToken()],
            useFactory(dataSource: DataSource) {
                return dataSource.getRepository(Customer).extend(customerRepository);
            }
        }
    ]
})
export class CustomerModule {}
