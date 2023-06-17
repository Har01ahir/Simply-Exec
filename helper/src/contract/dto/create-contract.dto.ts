import { UserDTO } from "./user.dto";

export class CreateContractDto {
    customer: UserDTO;
    vendor: UserDTO;
}