import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // {
  //   path: "",
  //   component: LoginComponent
  // },
  // {
  //   path: "dashboard",
  //   component: DashboardComponent
  // },
  // {
  //   path: "companyconfig",
  //   component: CompanyconfigComponent,
  //   children: [
  //     { path: '', component: ViewcompanyconfigComponent },
  //     { path: 'addcompanyconfig', component: AddcompanyconfigComponent },
  //     { path: 'editcompanyconfig', component: EditcompanyconfigComponent }
  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
