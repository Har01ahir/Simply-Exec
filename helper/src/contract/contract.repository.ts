import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Customer } from 'src/customer/customer.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { NotFoundException } from '@nestjs/common';

export interface ContractRepository extends Repository<Contract> {
    this: Repository<Contract>;
    createContract(cust: Customer, vend: Vendor);
    getContracts(): Promise<Contract[]>;
    getContractById(id: number): Promise<Contract>;
    getCustomerByContract(id: number): Promise<Customer>;
    getVendorByContract(id: number): Promise<Vendor>;
}

export const contractRepository: Pick<ContractRepository, any> = {

    async createContract(cust: Customer, vend: Vendor): Promise<Contract> {
        
        const contract = new Contract();

        contract.customer = cust;

        contract.vendor = vend;

        await contract.save();

        return contract;
        
    },

    async getContracts(): Promise<Contract[]> {
        // const query = this.createQueryBuilder('contract');

        // const contracts = await query.getMany();

        // return contracts
        const contracts = await this.createQueryBuilder('contract').getMany();
        console.log(contracts);
        return contracts;
    },

    async getContractById(id: number): Promise<Contract> {
        const contract = await this.findOne({
            where: { id }
        });

        if (!contract) {
            throw new NotFoundException(`Contract with Id: ${id} Not Found`);
        }        
        //     await this.findAndCount({
        //     where: { id }
        // }));
        return contract;
    },

    async getCustomerByContract(id: number): Promise<Customer> {
        
        const contract = await this.getContractById(id);

        const customerId = contract.customerId;
        const query = 'SELECT * FROM customer WHERE id = '+customerId;
        const customers = await this.query(query);  //first record only it gives
        
        return customers[0];
    },

    async getVendorByContract(id: number): Promise<Vendor> {
        
        const contract = await this.getContractById(id);

        const vendorId = contract.vendorId;
        const query = `SELECT * FROM vendor WHERE id = ${vendorId}`;
        const vendors = await this.query(query);  //first record only it gives
        
        return vendors[0];
    }
}