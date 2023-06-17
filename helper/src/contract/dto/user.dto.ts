import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone: string;
}

