import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HealthHubRoutingModule } from './health-hub-routing.module';
import { HealthHubComponent } from './health-hub/health-hub.component';


@NgModule({
  declarations: [
    HealthHubComponent
  ],
  imports: [
    CommonModule,
    HealthHubRoutingModule
  ]
})
export class HealthHubModule { } 