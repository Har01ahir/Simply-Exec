import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { DataSource } from 'typeorm';
import { contractRepository } from './contract.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Contract]),
    ],
    controllers: [],
    providers: [
      {
				provide: getRepositoryToken(Contract),
				inject: [getDataSourceToken()],
				useFactory(dataSource: DataSource) {
					return dataSource.getRepository(Contract).extend(contractRepository)
				}
			}
    ]
})
export class ContractModule {}
