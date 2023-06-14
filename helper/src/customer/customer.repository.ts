import { Repository } from "typeorm";
import { Customer } from './customer.entity';

export interface CustomerRepository extends Repository<Customer> {
    this: Repository<Customer>

}

export const customerRepository: Pick<CustomerRepository, any> = {

}