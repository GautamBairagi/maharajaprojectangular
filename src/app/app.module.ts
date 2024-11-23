import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './Authintercepter/auth.Intercepter';
import { CommunicationComponent } from './component/Categories/communication/communication.component';
import { CommunityAurSocialInvolvementComponent } from './component/Categories/community-aur-social-involvement/community-aur-social-involvement.component';
import { CurrentMedicationsComponent } from './component/Categories/current-medications/current-medications.component';
import { CurrentProvidersComponent } from './component/Categories/current-providers/current-providers.component';
import { DentalComponent } from './component/Categories/dental/dental.component';
import { EpsdtComponent } from './component/Categories/epsdt/epsdt.component';
import { HealthMedicalComponent } from './component/Categories/health-medical/health-medical.component';
import { PersonalAurEmotionalGrowthComponent } from './component/Categories/personal-aur-emotional-growth/personal-aur-emotional-growth.component';
import { SafetyComponent } from './component/Categories/safety/safety.component';
import { SelfCareComponent } from './component/Categories/self-care/self-care.component';
import { TransportationComponent } from './component/Categories/transportation/transportation.component';
import { WorkCareerEducationComponent } from './component/Categories/work-career-education/work-career-education.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CommunicationComponent,
    CommunityAurSocialInvolvementComponent,
    CurrentMedicationsComponent,
    CurrentProvidersComponent,
    DentalComponent,
    EpsdtComponent,
    HealthMedicalComponent,
    PersonalAurEmotionalGrowthComponent,
    SafetyComponent,
    SelfCareComponent,
    TransportationComponent,
    WorkCareerEducationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],

  bootstrap: [AppComponent]
})
export class AppModule { }
