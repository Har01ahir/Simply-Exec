import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Vendor } from './vendor.entity';
import { DataSource } from 'typeorm';
import { vendorRepository } from './vendor.repository';
import { VendorService } from './vendor.service';

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
		},
		VendorService
	],
	exports:[VendorService],
})
export class VendorModule {

}
