import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthGuard } from '../guards/auth/auth.guard';

import { MatFormFieldModule } from '@angular/material/form-field'

const routes: Routes = [
  { path: 'teacher/register', component: RegisterComponent },
  { path: 'student/register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterModule { }
