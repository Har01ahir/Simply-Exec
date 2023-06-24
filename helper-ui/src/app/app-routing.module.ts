import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContractComponent } from './contract/contract.component';
import { CreateContractComponent } from './contract/create-contract/create-contract.component';
import { ViewContractsComponent } from './contract/view-contracts/view-contracts.component';
<<<<<<< HEAD
import { DataTableComponent } from './contract/data-table/data-table.component';
=======
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { VendorTableComponent } from './vendor-table/vendor-table.component';
import { ContractTableComponent } from './contract/contract-table/contract-table.component';
>>>>>>> dev

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'contract/create-contract', component: CreateContractComponent},
<<<<<<< HEAD
  { path: 'contract/view-contracts', component: DataTableComponent},
  { path: 'contract/view-contracts/:id/:name', component: DataTableComponent}
]

@NgModule({
=======
  { path: 'contract/view-contracts', component: ContractTableComponent},
  { path: 'customer', component: CustomerTableComponent},
  { path: 'vendor', component: VendorTableComponent},
]

@NgModule({ 
>>>>>>> dev
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
