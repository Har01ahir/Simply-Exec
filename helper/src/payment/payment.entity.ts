import { Contract } from 'src/contract/contract.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { PaymentStatus } from '../contract/payment-status.enum';

@Entity()
export class Payment extends BaseEntity {
  
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Contract, contract => contract.payments)
	contract: Contract;

	@Column()
	amount: number;

	@Column()
	status: PaymentStatus;
}