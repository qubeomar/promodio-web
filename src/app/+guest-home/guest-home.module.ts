import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GuestHomeComponent } from './guest-home.component';
import { GuestHomePageComponent } from './guest-home-page/guest-home-page.component';
import { PopupLoginComponent } from './popup-login/popup-login.component';
import { PopupRegistrationComponent } from './popup-registration/popup-registration.component';
import { SharedModule } from '../shared/shared.module';

const ROUTES: Routes = [
  { path: '', component: GuestHomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    GuestHomeComponent,
    GuestHomePageComponent,
    PopupLoginComponent,
    PopupRegistrationComponent
  ]
})

export class GuestHomeModule {}
