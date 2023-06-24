import { InjectRepository } from "@nestjs/typeorm";
import { Vendor } from "./vendor.entity";
import { VendorRepository } from './vendor.repository';
import { UserDTO } from '../contract/dto/user.dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class VendorService {
    constructor(
        @InjectRepository(Vendor)
        private readonly vendorRepository: VendorRepository
    ) {}

    createVendor(userDTO: UserDTO): Promise<Vendor> {
        return this.vendorRepository.createVendor(userDTO);
    } 

    getAllVendors(): Promise<Vendor> {
        return this.vendorRepository.getAllVendors();
    }
}