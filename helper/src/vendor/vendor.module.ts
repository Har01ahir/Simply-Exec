import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { DataSource } from 'typeorm';
import { VendorRepository, vendorRepository } from './vendor.repository';

@Module({
	imports:[
		TypeOrmModule.forFeature([Vendor]),
	],
	controllers:[],
	providers: [
		{
			provide: getRepositoryToken(Vendor),
			inject: [getDataSourceToken()],
			useFactory(datasource: DataSource) {
				return datasource.getRepository(Vendor).extend(vendorRepository);
			}
		}
	]
})
export class VendorModule {

}
