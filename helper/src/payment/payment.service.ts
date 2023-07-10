import { Injectable } from '@nestjs/common';
import { AddPaymentDto } from '../contract/dto/add-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentRepository, paymentRepository } from './payment.repository';
import { Payment } from './payment.entity';
import { ContractService } from 'src/contract/contract.service';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private paymentRepository: PaymentRepository,
        private contractService: ContractService
    ) {

    }

    async addNewPayment(id: number,addPaymentDto: AddPaymentDto): Promise<Payment> {
        const contract = await this.contractService.updatePaymentStatus(id, addPaymentDto.status);

        const payment = await this.paymentRepository.addNewPayment(contract, addPaymentDto)

        return payment
    }

    async getAllPayments(): Promise<Payment[]> {
        return this.paymentRepository.getAllPayment()
    }
}
