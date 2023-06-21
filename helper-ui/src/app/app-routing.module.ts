import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ContractComponent } from './contract/contract.component';
import { CreateContractComponent } from './contract/create-contract/create-contract.component';
import { ViewContractsComponent } from './contract/view-contracts/view-contracts.component';
import { DataTableComponent } from './contract/data-table/data-table.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'contract', component: ContractComponent },
  { path: 'contract/create-contract', component: CreateContractComponent},
  { path: 'contract/view-contracts', component: DataTableComponent},
  { path: 'contract/view-contracts/:id/:name', component: DataTableComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
