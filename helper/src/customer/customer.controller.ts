import { Controller, Get } from '@nestjs/common';
import { CustomerService } from './customer.service';

@Controller('/customer')
export class CustomerController {

    constructor(private customerServivce: CustomerService) {}

    @Get('/')
    getAllCustomers() {
        return this.customerServivce.getAllCustomers();
    }
}
