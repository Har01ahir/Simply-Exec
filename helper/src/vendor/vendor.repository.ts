import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';
import { UserDTO } from 'src/contract/dto/user.dto';


export interface VendorRepository extends Repository<Vendor> {
  this: Repository<Vendor>
  createVendor(userDTO: UserDTO): Promise<Vendor>;
<<<<<<< HEAD
=======
  getAllVendors(): Promise<Vendor>;
>>>>>>> dev
}

export const vendorRepository: VendorRepository|any = {

  async createVendor(userDTO: UserDTO): Promise<Vendor> {

    const vendor = new Vendor();

    vendor.name = userDTO.name;
    vendor.phone = userDTO.phone;
    vendor.email = userDTO.email;

    await vendor.save();

    return vendor;
<<<<<<< HEAD
=======
  },

  async getAllVendors(): Promise<Vendor> {
    const vendors = await this.createQueryBuilder('vendor').getMany();
    return vendors
>>>>>>> dev
  }
} 