import { Repository } from 'typeorm';
import { Payment } from './payment.entity';
import { Contract } from 'src/contract/contract.entity';
import { AddPaymentDto } from 'src/contract/dto/add-payment.dto';

export interface PaymentRepository extends Repository<Payment> {
    this: Repository<Payment>;
    addNewPayment(contract: Contract, addPaymentDto: AddPaymentDto): Promise<Payment>
}

export const paymentRepository: Pick<PaymentRepository, any> = {

    async addNewPayment(contract: Contract, addPaymentDto: AddPaymentDto): Promise<Payment> {

        const { amount, status} = addPaymentDto;
        const payment = new Payment();

        payment.contract = contract;
        payment.amount = amount;
        payment.status = status;

        await payment.save();

        const payment_ = this.getpaymentById(payment.id)
        return payment_
    },

    async getpaymentById(id: number) {
        const payment = await this.findOne({
            where:{id}
        });
        return payment
    }
}