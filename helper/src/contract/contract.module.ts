import { Module } from '@nestjs/common';
import { TypeOrmModule, getRepositoryToken, getDataSourceToken } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { DataSource } from 'typeorm';
import { contractRepository } from './contract.repository';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { CustomerModule } from 'src/customer/customer.module';
import { VendorModule } from 'src/vendor/vendor.module';
import { CustomerService } from 'src/customer/customer.service';
import { VendorService } from 'src/vendor/vendor.service';

@Module({
    imports: [
      TypeOrmModule.forFeature([Contract]),
      CustomerModule,
      VendorModule,
    ],
    controllers: [ContractController],
    providers: [
      {
				provide: getRepositoryToken(Contract),
				inject: [getDataSourceToken()],
				useFactory(dataSource: DataSource) {
					return dataSource.getRepository(Contract).extend(contractRepository)
				}
			},
      ContractService,
    ],
    exports: [
      ContractService
    ]
})
export class ContractModule {}
