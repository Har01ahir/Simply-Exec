import { UserDTO } from "./user.dto";

export interface CreateContractDto {

    customer: UserDTO;

    vendor: UserDTO;
}