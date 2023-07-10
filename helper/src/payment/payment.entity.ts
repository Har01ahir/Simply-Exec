import { IsIn } from 'class-validator';
import { Contract } from 'src/contract/contract.entity';
import { CustomerPaymentStatus } from 'src/contract/enum/payment-status.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Payment extends BaseEntity {
  
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Contract, contract => contract.payments)
	contract: Contract;

	@Column()
	contractId: number;

	@Column('float')
	amount: number;

	@Column()
	@IsIn([CustomerPaymentStatus.PENDING, CustomerPaymentStatus.DONE])
	status: CustomerPaymentStatus;

	@CreateDateColumn({ type: 'timestamp' })
  	created_at: Date;
}