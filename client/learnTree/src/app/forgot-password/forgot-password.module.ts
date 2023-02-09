import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';

import { MatFormFieldModule } from '@angular/material/form-field'

const routes: Routes = [
  { path: 'student/forgot-password', component: ForgotPasswordComponent },
  { path: 'teacher/forgot-password', component: ForgotPasswordComponent }
]

@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    RouterModule
  ]
})
export class ForgotPasswordModule { }
