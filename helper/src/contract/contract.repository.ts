import { Repository } from 'typeorm';
import { Contract } from './contract.entity';

export interface ContractRepository extends Repository<Contract> {
    this: Repository<Contract>;
}

export const contractRepository: Pick<ContractRepository, any> = {

}