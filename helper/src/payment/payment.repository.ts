import { Repository } from 'typeorm';
import { Payment } from './payment.entity';

export interface PaymentRepository extends Repository<Payment> {
    this: Repository<Payment>;
}

export const paymentRepository: Pick<PaymentRepository, any> = {

}