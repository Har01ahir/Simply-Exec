import { Controller, Get } from '@nestjs/common';
import { VendorService } from './vendor.service';
import { Vendor } from './vendor.entity';

@Controller('vendor')
export class VendorController {
    constructor(private vendorService: VendorService) {}

    @Get('/')
    getAllVendors(): Promise<Vendor> {
        return this.vendorService.getAllVendors();
    }
}
