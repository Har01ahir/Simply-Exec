import { IsIn, IsNotEmpty } from "class-validator";
import { CustomerPaymentStatus } from "../enum/payment-status.enum";

export class AddPaymentDto {

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    @IsIn([CustomerPaymentStatus.PENDING, CustomerPaymentStatus.DONE])
    status: CustomerPaymentStatus;

}