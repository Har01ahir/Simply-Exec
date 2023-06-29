import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { TypeOrmModule, getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Payment } from './payment.entity';
import { DataSource } from 'typeorm';
import { paymentRepository } from './payment.repository';
import { ContractModule } from 'src/contract/contract.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    ContractModule
  ],
  controllers: [PaymentController],
  providers: [
    {
      provide: getRepositoryToken(Payment),
      inject: [getDataSourceToken()],
      useFactory(dataSource: DataSource) {
        return dataSource.getRepository(Payment).extend(paymentRepository)
      }
    },
    PaymentService
  ]
})
export class PaymentModule {}
