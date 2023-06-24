import { UserDTO } from "./user.dto";

<<<<<<< HEAD
export class CreateContractDto {

    customer!: UserDTO;

    vendor!: UserDTO;
=======
export interface CreateContractDto {

    customer: UserDTO;

    vendor: UserDTO;
>>>>>>> dev
}