import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';


export interface VendorRepository extends Repository<Vendor> {
  this: Repository<Vendor>
}

export const vendorRepository: VendorRepository|any = {

} 