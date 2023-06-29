import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AddPaymentDto } from 'src/contract/dto/add-payment.dto';
import { PaymentService } from './payment.service';
import { Payment } from './payment.entity';
import { Contract } from 'src/contract/contract.entity';

@Controller('payment')
export class PaymentController {

    constructor(
        private paymentService: PaymentService
    ) {

    }
    @Post('/:id')
    addNewPayment(
        @Param('id', ParseIntPipe) id: number,
        @Body() addPaymentDto: AddPaymentDto
     ): Promise<Payment>  {

        return this.paymentService.addNewPayment(id, addPaymentDto);
    }
}
