import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialModule } from '../materialmodule/materialmodule';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,

  ],
  bootstrap: [PagesComponent]

})
export class PagesModule { }
