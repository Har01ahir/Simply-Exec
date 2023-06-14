import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { ContractStatus } from './contract-status.enum';
import { PaymentStatus } from '../payment/payment-status.enum';
import { VendorDeliveryStatus } from './vendor-delivery-status.enum';
import { Vendor } from 'src/vendor/vendor.entity';
import { Payment } from 'src/payment/payment.entity';

@Entity()
export class Contract extends BaseEntity {
  
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.contracts)
  	customer: Customer;

	@Column()
	customer_id: number;

	@ManyToOne(()=>Vendor, vendor => vendor.contracts)
	vendor: Vendor;

	@Column()
	vendor_id: number;

	@Column()
	status: ContractStatus;

	@Column()
	customer_payment_status: PaymentStatus;

	@Column()
	vendor_delivery_status: VendorDeliveryStatus;

	@OneToMany(() => Payment, payment => payment.contract)
	payments: Payment[];

}