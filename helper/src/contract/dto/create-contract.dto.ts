import { IsNotEmpty } from "class-validator";
import { UserDTO } from "./user.dto";

export class CreateContractDto {

    @IsNotEmpty()
    customer: UserDTO;

    @IsNotEmpty()
    vendor: UserDTO;
}