import { Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from './contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractRepository } from './contract.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { CustomerService } from 'src/customer/customer.service';
import { VendorService } from 'src/vendor/vendor.service';
import { Customer } from 'src/customer/customer.entity';
import { Vendor } from 'src/vendor/vendor.entity';

@Injectable()
export class ContractService {
    constructor(
        private readonly customerService: CustomerService,
        @InjectRepository(Contract)
        private readonly contractRepository: ContractRepository,
        private vendorService: VendorService,
    ) {}

    async createContract(createContractDto: CreateContractDto): Promise<Contract> {

        const cust = await this.customerService.createCustomer(createContractDto.customer);
        
        const vend = await this.vendorService.createVendor(createContractDto.vendor);
        
        return await this.contractRepository.createContract(cust, vend);
    }

    async getContracts(): Promise<Contract[]> {
        return this.contractRepository.getContracts();
    }

    async getContractById(Id: number): Promise<Contract> {
        const contract = await this.contractRepository.getContractById(Id);

        if (!contract) {
            throw new NotFoundException(`Contract with Id: ${Id} not Found`);
        }

        return contract;
    }

    async getCustomerByContract(Id: number): Promise<Customer> {
        const customer = await this.contractRepository.getCustomerByContract(Id);

        if (!customer) {
            console.log(customer);
            throw new NotFoundException(`Customer with Contract Id: ${Id} not Found`);
        }

        return customer;
    }

    async getVendorByContract(Id: number): Promise<Vendor> {
        const customer = await this.contractRepository.getVendorByContract(Id);

        if (!customer) {
            console.log(customer);
            throw new NotFoundException(`Vendor with Contract Id: ${Id} not Found`);
        }

        return customer;
    }
}
