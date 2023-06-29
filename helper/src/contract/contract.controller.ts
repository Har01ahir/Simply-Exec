import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';
import { Customer } from 'src/customer/customer.entity';
import { Vendor } from 'src/vendor/vendor.entity';
import { VendorDeliveryStatus } from './enum/vendor-delivery-status.enum';
import { ContractStatus } from './enum/contract-status.enum';

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}//

    @Post('/create')
    create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
        return this.contractService.createContract(createContractDto);
    }

    @Get('/view-contracts')
    getContracts() {
        return this.contractService.getContracts();
    }

    @Get('/:id')
    getContractById(
        @Param('id') id: number,
    ): Promise<Contract> {
        return this.contractService.getContractById(id);
    }

    @Get('/customer/:id')
    getCustomerByContract(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Customer> {
        return this.contractService.getCustomerByContract(id);
    }

    @Get('/vendor/:id')
    getVendorByContract(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Vendor> {
        return this.contractService.getVendorByContract(id);
    }

    @Patch('/deliverystatus/:id')
    updateDeliveryStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: VendorDeliveryStatus
    ): Promise<Contract> {
        return this.contractService.updateDeliveryStatus(id, status)
    }

    @Patch('/status/:id')
    updateContractStatus(
        @Param('id') id: number,
        @Body('status') status: ContractStatus
    ): Promise<Contract> {
        return this.contractService.updateContractStatus(id, status);
    }

}
