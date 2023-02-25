import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthGuard } from '../guards/auth.guard';

import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: 'user/register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports: [RouterModule],
})
export class RegisterModule {}
