import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "./customer.entity";
import { CustomerRepository } from './customer.repository';
import { UserDTO } from '../contract/dto/user.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: CustomerRepository
    ) {}

    async createCustomer(userDTO: UserDTO): Promise<Customer> {
        return this.customerRepository.createCustomer(userDTO);
    }


}