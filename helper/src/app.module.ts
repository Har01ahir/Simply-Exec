import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { VendorModule } from './vendor/vendor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ContractModule } from './contract/contract.module';
import { PaymentModule } from './payment/payment.module';

@Module({
  imports: [
    CustomerModule, 
    VendorModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ContractModule,
    PaymentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
