import { Injectable, NotFoundException } from '@nestjs/common';
import { Contract } from './contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractRepository } from './contract.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { CustomerService } from 'src/customer/customer.service';
import { VendorService } from 'src/vendor/vendor.service';
import { Customer } from 'src/customer/customer.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { CustomerPaymentStatus } from './enum/payment-status.enum';
import { VendorDeliveryStatus } from './enum/vendor-delivery-status.enum';
import { ContractStatus } from './enum/contract-status.enum';

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

    async updatePaymentStatus(id: number, status: CustomerPaymentStatus): Promise<Contract> {
        return this.contractRepository.updatePaymentStatus(id, status);
    }

    async updateDeliveryStatus(id: number, status: VendorDeliveryStatus): Promise<Contract> {
        return this.contractRepository.updateDeliveryStatus(id, status);
    }

    async updateContractStatus(id: number, status: ContractStatus): Promise<Contract> {
        return this.contractRepository.updateContractStatus(id, status);
    }
}
