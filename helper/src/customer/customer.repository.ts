import { Repository } from "typeorm";
import { Customer } from './customer.entity';
import { CreateContractDto } from '../contract/dto/create-contract.dto';
import { UserDTO } from "src/contract/dto/user.dto";
import { Injectable } from "@nestjs/common";


export interface CustomerRepository extends Repository<Customer> {
    this: Repository<Customer>
    createCustomer(userDto: UserDTO): Promise<Customer>;
    getAllCustomers(): Promise<Customer[]>;
}


export const customerRepository: Pick<CustomerRepository, any> = {
    
    async createCustomer(userDto: UserDTO): Promise<Customer> {
        const customer = new Customer();

        customer.name = userDto.name;
        customer.phone = userDto.phone;
        customer.email =  userDto.email;

        await customer.save();
                
        return customer;
    },

    async getAllCustomers(): Promise<Customer[]> {
        const customers = await this.createQueryBuilder('customer').getMany();
        return customers;
    }
}