import { Contract } from 'src/contract/contract.entity';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Vendor extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    mobile: number;

    @Column()
    email: string;

    @OneToMany(()=>Contract, contract => contract.vendor)
    contracts: Contract[];
}