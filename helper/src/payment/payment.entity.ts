import { Contract } from 'src/contract/contract.entity';
import { PaymentStatus } from 'src/contract/enum/payment-status.enum';
import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';

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