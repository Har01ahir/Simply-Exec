import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { PaymentStatus } from './enum/payment-status.enum';
import { VendorDeliveryStatus } from './enum/vendor-delivery-status.enum';
import { Vendor } from 'src/vendor/vendor.entity';
import { Payment } from 'src/payment/payment.entity';
import { ContractStatus } from './enum/contract-status.enum';

@Entity()
export class Contract extends BaseEntity {
  
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.contracts)
  	customer: Customer;

	@Column()
	customerId: number;

	@ManyToOne(()=>Vendor, vendor => vendor.contracts)
	vendor: Vendor;

	@Column()
	vendorId: number;

	@Column()
	status: ContractStatus = ContractStatus.INITIAL;

	@Column()
	customer_payment_status: PaymentStatus = PaymentStatus.PENDING;

	@Column()
	vendor_delivery_status: VendorDeliveryStatus = VendorDeliveryStatus.INITIAL;

	@OneToMany(() => Payment, payment => payment.contract)
	payments: Payment[];

}