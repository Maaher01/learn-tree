import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthGuard } from '../guards/auth/auth.guard';

const routes: Routes = [
  { path: 'teacher/register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'student/register', component: RegisterComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    RouterModule
  ]
})
export class RegisterModule { }
