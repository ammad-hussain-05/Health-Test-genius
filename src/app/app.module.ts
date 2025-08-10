import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Updated Firebase imports for v19
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { AppRoutingModule, HomeComponent } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { HeroComponent } from './components/hero/hero.component';
import { HealthServicesComponent } from './components/health-services/health-services.component';
import { PartnersComponent } from './components/partners/partners.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FooterComponent } from './components/footer/footer.component';
import { ServiceDetailsComponent } from './components/service-details/service-details.component';
import { DynamicServiceComponent } from './components/dynamicComponent/dynamic-service.component';
import { PartnerComponent } from './partner/partner.component';
import { MissionComponent } from './mission/mission.component';
import { UserTermsComponent } from './user-terms/user-terms.component';
import { HealthHubComponent } from './components/health-hub/health-hub.component';

const firebaseConfig = {
  apiKey: "AIzaSyAmU9A0SWaE3RFPv33aToLedCuILQ-PNvY",
  authDomain: "guru-52694.firebaseapp.com",
  projectId: "guru-52694",
  storageBucket: "guru-52694.firebasestorage.app",
  messagingSenderId: "78194276137",
  appId: "1:78194276137:web:a64bbf4dcdad288c242938",
  measurementId: "G-WP9L9DR0VV"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    DynamicServiceComponent,
    SearchBarComponent,
    SearchResultsComponent,
    HeroComponent,
    HealthServicesComponent,
    PartnersComponent,
    HowItWorksComponent,
    FooterComponent,
    ServiceDetailsComponent,
    PartnerComponent,
    MissionComponent,
    UserTermsComponent,
    HealthHubComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
