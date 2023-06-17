import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Customer } from 'src/customer/customer.entity';
import { Vendor } from 'src/vendor/vendor.entity';

export interface ContractRepository extends Repository<Contract> {
    this: Repository<Contract>;
    createContract(cust: Customer, vend: Vendor);
}

export const contractRepository: Pick<ContractRepository, any> = {

    async createContract(cust: Customer, vend: Vendor): Promise<Contract> {
        
        const contract = new Contract();

        contract.customer = cust;

        contract.vendor = vend;

        await contract.save();

        return contract;
        
    }
}