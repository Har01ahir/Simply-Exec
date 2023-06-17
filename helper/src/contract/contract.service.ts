import { Injectable } from '@nestjs/common';
import { Contract } from './contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractRepository } from './contract.repository';
import { CreateContractDto } from './dto/create-contract.dto';
import { CustomerService } from 'src/customer/customer.service';
import { VendorService } from 'src/vendor/vendor.service';

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
}
