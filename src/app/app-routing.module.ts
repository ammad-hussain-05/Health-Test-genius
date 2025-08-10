import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicServiceComponent } from './components/dynamicComponent/dynamic-service.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { PartnerComponent } from './partner/partner.component';
import { MissionComponent } from './mission/mission.component';
import { UserTermsComponent } from './user-terms/user-terms.component';
import { HealthHubComponent } from './components/health-hub/health-hub.component';

// Create a home component wrapper
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-search-bar></app-search-bar>
    <app-hero></app-hero>
    <app-health-services></app-health-services>
    <app-partners></app-partners>
    <app-how-it-works></app-how-it-works>
  `,
  standalone: false
})
export class HomeComponent { }

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'search-results',
    component: SearchResultsComponent
  },
  {
    path: 'service/:serviceName',
    component: DynamicServiceComponent
  },
  {
    path: 'service-details/:serviceId',
    component: DynamicServiceComponent
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then(m => m.FaqsModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule)
  },
  {
    path: 'partners',
    loadChildren: () => import('./partners/partners.module').then(m => m.PartnersModule)
  },
  {
    path: 'partner',
    component: PartnerComponent
  },
  {
    path: 'mission',
    component: MissionComponent
  },
  {
    path: 'user-terms',
    component: UserTermsComponent
  },
  // Static pages using placeholder component
  {
    path: 'about',
    component: DynamicServiceComponent
  },
  {
    path: 'terms',
    component: DynamicServiceComponent
  },
  {
    path: 'privacy',
    component: DynamicServiceComponent
  },
  {
    path: 'health-hub',
    component: HealthHubComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false, // Set to true for debugging
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { } 