import { Repository } from 'typeorm';
import { Contract } from './contract.entity';
import { Customer } from 'src/customer/customer.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { NotFoundException } from '@nestjs/common';
import { AddPaymentDto } from './dto/add-payment.dto';
import { CustomerPaymentStatus } from './enum/payment-status.enum';
import { VendorDeliveryStatus } from './enum/vendor-delivery-status.enum';
import { ContractStatus } from './enum/contract-status.enum';

export interface ContractRepository extends Repository<Contract> {
    this: Repository<Contract>;
    createContract(cust: Customer, vend: Vendor);

    getContracts(): Promise<Contract[]>;

    getContractById(id: number): Promise<Contract>;

    getCustomerByContract(id: number): Promise<Customer>;

    getVendorByContract(id: number): Promise<Vendor>;

    updatePaymentStatus(id: number,status: CustomerPaymentStatus): Promise<Contract>;

    updateDeliveryStatus(id: number, status: VendorDeliveryStatus): Promise<Contract>;
    
    updateContractStatus(id: number, status: ContractStatus): Promise<Contract>;
}

export const contractRepository: Pick<ContractRepository, any> = {

    async createContract(cust: Customer, vend: Vendor): Promise<Contract> {
        
        const contract = new Contract();

        contract.customer = cust;

        contract.vendor = vend;

        await contract.save();

        return this.getContractById(contract.id);
        
    },

    async getContracts(): Promise<Contract[]> {
        const contracts = await this.createQueryBuilder('contract').getMany();
        return contracts;
    },

    async getContractById(id: number): Promise<Contract> {
        const contract = await this.findOne({
            where: { id }
        });

        if (!contract) {
            throw new NotFoundException(`Contract with Id: ${id} Not Found`);
        }  
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
    },

    async updatePaymentStatus(id: number,status: CustomerPaymentStatus): Promise<Contract> {

        const contract = await this.findOne({
            where: { id }
        });

        contract.customer_payment_status = status;
        if (status === 'done' ) {
            if (contract.status === ContractStatus.INITIAL) {
                contract.status = ContractStatus.LIVE;
            }
            if (contract.vendor_delivery_status === VendorDeliveryStatus.INITIAL) {
                contract.vendor_delivery_status = VendorDeliveryStatus.IN_TRANSIT
            }
        }

        contract.save();

        return contract
    },

    async updateDeliveryStatus(id: number, status: VendorDeliveryStatus): Promise<Contract> {
        const contract = await this.getContractById(id)

        contract.vendor_delivery_status = status;

        contract.save();

        return contract;
    },

    async updateContractStatus(id: number, status: ContractStatus): Promise<Contract> {
        const contract = await this.getContractById(id)

        contract.status = status;

        contract.save();

        return contract;
    }
}