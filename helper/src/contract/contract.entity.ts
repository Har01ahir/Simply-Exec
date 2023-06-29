import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { CustomerPaymentStatus } from './enum/payment-status.enum';
import { VendorDeliveryStatus } from './enum/vendor-delivery-status.enum';
import { Vendor } from 'src/vendor/vendor.entity';
import { Payment } from 'src/payment/payment.entity';
import { ContractStatus } from './enum/contract-status.enum';
import { IsIn } from 'class-validator';

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
	@IsIn([ContractStatus.INITIAL, ContractStatus.LIVE, ContractStatus.DONE])
	status: ContractStatus = ContractStatus.INITIAL;

	@Column()
	@IsIn([CustomerPaymentStatus.PENDING, CustomerPaymentStatus.DONE])
	customer_payment_status: CustomerPaymentStatus = CustomerPaymentStatus.PENDING;

	@IsIn([VendorDeliveryStatus.INITIAL, VendorDeliveryStatus.IN_TRANSIT, VendorDeliveryStatus.DELIVERED])
	@Column()
	vendor_delivery_status: VendorDeliveryStatus = VendorDeliveryStatus.INITIAL;

	@OneToMany(() => Payment, payment => payment.contract)
	payments: Payment[];

	@CreateDateColumn({ type: 'timestamp' })
  	created_at: Date;

  	@UpdateDateColumn({ type: 'timestamp' })
  	updated_at: Date;

}