import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { UserDTO } from 'src/contract/dto/user.dto';


export interface VendorRepository extends Repository<Vendor> {
  this: Repository<Vendor>
  createVendor(userDTO: UserDTO): Promise<Vendor>;
}

export const vendorRepository: VendorRepository|any = {

  async createVendor(userDTO: UserDTO): Promise<Vendor> {

    const vendor = new Vendor();

    vendor.name = userDTO.name;
    vendor.phone = userDTO.phone;
    vendor.email = userDTO.email;

    await vendor.save();

    return vendor;
  }
} 