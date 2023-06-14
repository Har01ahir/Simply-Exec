import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contract } from 'src/contract/contract.entity';

@Entity()
export class Customer extends BaseEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mobile: number;
    
    @Column()
    email: string;

    @OneToMany(()=>Contract, contract => contract.customer)
    contracts: Contract[];


}
