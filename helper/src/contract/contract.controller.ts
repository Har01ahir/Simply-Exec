import { Body, Controller, Post } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractService } from './contract.service';
import { Contract } from './contract.entity';

@Controller('contract')
export class ContractController {
    constructor(private contractService: ContractService) {}//

    @Post('/create')
    create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
        return this.contractService.createContract(createContractDto);
    }

}
